import os
import joblib
import numpy as np
import pandas as pd
import tensorflow as tf
# pyrefly: ignore [missing-import]
import keras
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
# pyrefly: ignore [missing-import]
from keras import layers

# Initialize FastAPI application
app = FastAPI(
    title="Mirai Medical Prediction Model API (Keras Residual Network)",
    description="Microservice API for predicting medical diseases using a custom Residual Neural Network with Focal Loss.",
    version="1.0.0"
)

# Global variables to cache the model and scaler in memory
model = None
scaler = None

# Custom Layer: Residual Block required by Keras model
@keras.saving.register_keras_serializable(package="custom_layers")
class ResidualBlock(layers.Layer):
    """Dense residual block dengan BatchNorm + Dropout."""
    def __init__(self, units, dropout_rate=0.3, **kwargs):
        super().__init__(**kwargs)
        self.dense1 = layers.Dense(units, activation='relu')
        self.dense2 = layers.Dense(units)
        self.bn1    = layers.BatchNormalization()
        self.bn2    = layers.BatchNormalization()
        self.drop   = layers.Dropout(dropout_rate)
        self.proj   = None  # projection jika input dim berbeda
        self._units = units

    def build(self, input_shape):
        if input_shape[-1] != self._units:
            self.proj = layers.Dense(self._units)
        super().build(input_shape)

    def call(self, x, training=False):
        shortcut = self.proj(x) if self.proj else x
        out = self.bn1(self.dense1(x),  training=training)
        out = self.drop(out,             training=training)
        out = self.bn2(self.dense2(out), training=training)
        return tf.nn.relu(out + shortcut)

    def get_config(self):
        cfg = super().get_config()
        cfg.update({'units': self._units, 'dropout_rate': self.drop.rate})
        return cfg

# Custom Loss: Focal Loss required by Keras model
@keras.saving.register_keras_serializable(package="custom_losses")
class FocalLoss(keras.losses.Loss):
    """Focal Loss untuk menangani class imbalance secara adaptif."""
    def __init__(self, gamma=2.0, alpha=0.25, **kwargs):
        super().__init__(**kwargs)
        self.gamma = gamma
        self.alpha = alpha

    def call(self, y_true, y_pred):
        y_true_oh = tf.one_hot(tf.cast(y_true, tf.int32), depth=4)
        y_pred    = tf.clip_by_value(y_pred, 1e-7, 1.0)
        ce  = -tf.reduce_sum(y_true_oh * tf.math.log(y_pred), axis=-1)
        pt  = tf.reduce_sum(y_true_oh * y_pred, axis=-1)
        fl  = self.alpha * tf.pow(1.0 - pt, self.gamma) * ce
        return tf.reduce_mean(fl)

    def get_config(self):
        cfg = super().get_config()
        cfg.update({'gamma': self.gamma, 'alpha': self.alpha})
        return cfg

@app.on_event("startup")
def startup_load_resources():
    """
    Load Keras Deep Learning ResNet model and StandardScaler on server startup.
    """
    global model, scaler
    dir_path = os.path.dirname(os.path.realpath(__file__))
    
    # 1. Load the StandardScaler
    scaler_path = os.path.join(dir_path, 'scaler.pkl')
    if not os.path.exists(scaler_path):
         raise RuntimeError(f"StandardScaler file not found at: {scaler_path}")
    try:
        scaler = joblib.load(scaler_path)
        print("--- StandardScaler Loaded Successfully! ---")
    except Exception as e:
        raise RuntimeError(f"Error loading StandardScaler: {str(e)}")

    # 2. Load the Keras Residual Network model
    model_path = os.path.join(dir_path, 'medical_classifier.keras')
    if not os.path.exists(model_path):
        raise RuntimeError(f"Keras model (.keras) not found at: {model_path}")
    
    try:
        model = keras.models.load_model(
            model_path,
            custom_objects={'ResidualBlock': ResidualBlock, 'FocalLoss': FocalLoss}
        )
        print("--- Keras Deep Learning ResNet Model Loaded & Deserialized Successfully! ---")
    except Exception as e:
        # Fallback to config parsing if direct load fails (similar to quantization_config issue in keras 3)
        try:
            print("Direct load failed, attempting unzipping & config cleaning fallback...")
            import zipfile
            import json
            
            unzip_dest = os.path.join(dir_path, 'keras_unzipped')
            os.makedirs(unzip_dest, exist_ok=True)
            with zipfile.ZipFile(model_path, 'r') as zip_ref:
                zip_ref.extractall(unzip_dest)
                
            config_json_path = os.path.join(unzip_dest, 'config.json')
            weights_h5_path = os.path.join(unzip_dest, 'model.weights.h5')
            
            with open(config_json_path, "r", encoding="utf-8") as f:
                model_config = json.load(f)
                
            def clean_config(d):
                if isinstance(d, dict):
                    if "quantization_config" in d:
                        del d["quantization_config"]
                    for k, v in list(d.items()):
                        clean_config(v)
                elif isinstance(d, list):
                    for item in d:
                        clean_config(item)
                        
            clean_config(model_config)
            
            model = keras.saving.deserialize_keras_object(
                model_config, 
                custom_objects={'ResidualBlock': ResidualBlock, 'FocalLoss': FocalLoss}
            )
            model.load_weights(weights_h5_path)
            print("--- Keras Deep Learning ResNet Model Loaded via Deserialization Fallback! ---")
        except Exception as fallback_err:
            raise RuntimeError(f"Failed to load Keras model: {str(e)} -> Fallback error: {str(fallback_err)}")

# Define validation schema for request inputs using Pydantic
class MedicalPredictionInput(BaseModel):
    gender: float  # 0 = Female, 1 = Male
    age: float
    cholesterol_total: float
    creatinine: float
    fbs: float
    rbs: float
    hgb: float
    lymphocyte_percent: float
    mch: float
    mchc: float
    mcv: float
    urea: float
    wbc: float

@app.get("/")
def read_root():
    """
    FastAPI Health-check endpoint.
    """
    return {
        "status": "healthy",
        "service": "Mirai Keras ResNet DL Prediction Service",
        "model_loaded": model is not None,
        "scaler_loaded": scaler is not None
    }

@app.post("/predict")
def predict_disease(data: MedicalPredictionInput):
    """
    Endpoint to evaluate disease risks based on 13 clinical features.
    """
    if model is None or scaler is None:
        raise HTTPException(
            status_code=503, 
            detail="Prediction model or scaler is not loaded on the server."
        )
    
    try:
        # 1. Map input features to exact names expected by the StandardScaler
        # Column order MUST match:
        # ['JENIS_KELAMIN', 'UMUR_TAHUN', 'cholesterol total', 'creatinin', 'fbs', 'rbs', 'hgb', 'lymfosit%', 'mch', 'mchc', 'mcv', 'ureum', 'wbc']
        feature_mapping = {
            'JENIS_KELAMIN': data.gender,
            'UMUR_TAHUN': data.age,
            'cholesterol total': data.cholesterol_total,
            'creatinin': data.creatinine,
            'fbs': data.fbs,
            'rbs': data.rbs,
            'hgb': data.hgb,
            'lymfosit%': data.lymphocyte_percent,
            'mch': data.mch,
            'mchc': data.mchc,
            'mcv': data.mcv,
            'ureum': data.urea,
            'wbc': data.wbc
        }
        
        # Construct single-row Pandas DataFrame and apply StandardScaler
        cols = ['JENIS_KELAMIN', 'UMUR_TAHUN', 'cholesterol total', 'creatinin', 'fbs', 'rbs', 'hgb', 'lymfosit%', 'mch', 'mchc', 'mcv', 'ureum', 'wbc']
        df_raw = pd.DataFrame([feature_mapping], columns=cols)
        X_scaled = scaler.transform(df_raw)
        
        # 2. Keras Model Prediction
        # Output shape: (1, 4) representing softmax probabilities for:
        # Output Index 0: Normal / Sehat
        # Output Index 1: Jantung
        # Output Index 2: Penyakit Dalam
        # Output Index 3: Paru-paru
        probabilities = model.predict(X_scaled)[0].tolist()
        
        # Map output index of Keras to the predicted class argmax
        predicted_keras_class = int(np.argmax(probabilities))
        
        # Map Keras 4-class indexes to legacy database/frontend disease class IDs:
        # 0 (Normal) -> 0 (Normal / Sehat)
        # 1 (Jantung) -> 1 (Jantung)
        # 2 (Penyakit Dalam) -> 3 (Penyakit Dalam)
        # 3 (Paru-paru) -> 2 (Paru-paru)
        keras_to_legacy_class = {
            0: 0,
            1: 1,
            2: 3,
            3: 2
        }
        predicted_class = keras_to_legacy_class.get(predicted_keras_class, 0)
        
        # 3. Format predictions to match legacy API response format
        # Disease Mapping (disease_id):
        # 1 = Jantung (mapped to Keras prob index 1)
        # 2 = Penyakit Dalam (mapped to Keras prob index 2)
        # 3 = Paru-paru (mapped to Keras prob index 3)
        prob_jantung = probabilities[1]
        prob_penyakit_dalam = probabilities[2]
        prob_paru_paru = probabilities[3]
        
        disease_probs = [
            {"disease_id": 1, "disease_name": "Jantung", "prob": prob_jantung},
            {"disease_id": 2, "disease_name": "Penyakit Dalam", "prob": prob_penyakit_dalam},
            {"disease_id": 3, "disease_name": "Paru-paru", "prob": prob_paru_paru}
        ]
        
        predictions = []
        for d in disease_probs:
            prob = d["prob"]
            
            # Categorize Risk exactly as in legacy API
            if prob < 0.3:
                risk = "Low"
            elif prob < 0.7:
                risk = "Medium"
            else:
                risk = "High"
                
            predictions.append({
                "disease_id": d["disease_id"],
                "disease_name": d["disease_name"],
                "probability": round(prob, 5),
                "risk": risk
            })
            
        status_map = {
            0: "Normal",
            1: "Jantung",
            2: "Paru-paru",
            3: "Penyakit Dalam"
        }
        overall_status = status_map.get(predicted_class, "Unknown")
        
        return {
            "success": True,
            "predicted_class": predicted_class,
            "overall_status": overall_status,
            "predictions": predictions
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Prediction error: {str(e)}"
        )
