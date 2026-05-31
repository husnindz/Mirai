import { insertCheckUp, insertDiseasePrediction, findPredictionHistoryByUserId } from '../models/predictions.js';

// Configuration URL for the FastAPI Prediction Service
const MODEL_SERVICE_URL = process.env.MODEL_SERVICE_URL || 'http://localhost:8000';

/**
 * Maps gender string or number representation to 0 (Female) or 1 (Male)
 */
const mapGender = (gender) => {
  if (gender === 0 || gender === 1) return gender;
  if (typeof gender === 'string') {
    const lower = gender.trim().toLowerCase();
    if (lower === 'laki-laki' || lower === 'l' || lower === 'male' || lower === 'm' || lower === '1') {
      return 1;
    }
    if (lower === 'perempuan' || lower === 'p' || lower === 'female' || lower === 'f' || lower === '0') {
      return 0;
    }
  }
  return null;
};

/**
 * Communicates with the FastAPI model microservice to obtain predictions
 */
const runPredictionModel = async (inputData) => {
  try {
    const response = await fetch(`${MODEL_SERVICE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputData)
    });
    
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`FastAPI returned status ${response.status}: ${errText}`);
    }
    
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(`Failed to communicate with prediction microservice: ${error.message}`);
  }
};

/**
 * Helper to validate and extract prediction inputs
 */
const validateAndExtractInputs = (body) => {
  const rawGender = body.gender !== undefined ? body.gender : body.jenis_kelamin !== undefined ? body.jenis_kelamin : body.jk;
  const genderVal = mapGender(rawGender);
  if (genderVal === null) {
    throw new Error("Field 'gender' is required and must be either 0/1 or Laki-laki/Perempuan");
  }

  const activeAge = body.age !== undefined ? body.age : body.umur_tahun !== undefined ? body.umur_tahun : body.umur;
  const ageVal = parseFloat(activeAge);

  // Read input fields supporting both English and legacy Indonesian names
  const fields = {
    gender: genderVal,
    age: ageVal,
    cholesterol_total: parseFloat(body.cholesterol_total !== undefined ? body.cholesterol_total : body.cholesterol),
    creatinine: parseFloat(body.creatinine !== undefined ? body.creatinine : body.creatinin),
    fbs: parseFloat(body.fbs),
    rbs: parseFloat(body.rbs),
    hgb: parseFloat(body.hgb),
    lymphocyte_percent: parseFloat(body.lymphocyte_percent !== undefined ? body.lymphocyte_percent : body.lymfosit_persen !== undefined ? body.lymfosit_persen : body.lymfosit),
    mch: parseFloat(body.mch),
    mchc: parseFloat(body.mchc),
    mcv: parseFloat(body.mcv),
    urea: parseFloat(body.urea !== undefined ? body.urea : body.ureum),
    wbc: parseFloat(body.wbc)
  };

  // Check for NaN values
  for (const [key, val] of Object.entries(fields)) {
    if (isNaN(val)) {
      throw new Error(`Field '${key}' is required and must be a valid number`);
    }
  }

  return fields;
};

/**
 * POST /predictions
 * Runs the prediction model and saves both the check-up and the disease predictions to the database.
 */
export async function createPrediction(req, res) {
  try {
    const userId = req.user.user_id;
    if (!userId) {
      return res.status(401).json({
        message: 'Unauthorized. User ID is missing!'
      });
    }

    const validatedData = validateAndExtractInputs(req.body);
    const result = await runPredictionModel(validatedData);

    // Save check-up record
    // Map fields to database model format
    const checkUpData = {
      cholesterol: validatedData.cholesterol_total,
      creatinin: validatedData.creatinine,
      fbs: validatedData.fbs,
      rbs: validatedData.rbs,
      hgb: validatedData.hgb,
      lymfosit: validatedData.lymphocyte_percent,
      mch: validatedData.mch,
      mchc: validatedData.mchc,
      mcv: validatedData.mcv,
      ureum: validatedData.urea,
      wbc: validatedData.wbc
    };

    const checkUpResult = await insertCheckUp(userId, checkUpData);
    const checkUpId = checkUpResult.rows[0].check_up_id;

    // Save each disease prediction
    const savedPredictions = [];
    for (const pred of result.predictions) {
      const predResult = await insertDiseasePrediction(
        checkUpId,
        pred.disease_id,
        pred.probability,
        pred.risk
      );
      savedPredictions.push({
        ...pred,
        prediction_id: predResult.rows[0].prediction_id
      });
    }

    res.status(201).json({
      message: 'Check-up and predictions successfully saved to database',
      data: {
        check_up_id: checkUpId,
        overall_status: result.overall_status,
        predicted_class: result.predicted_class,
        predictions: savedPredictions,
        created_at: checkUpResult.rows[0].created_at
      }
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error processing and saving check-up prediction',
      error: error.message
    });
  }
}

/**
 * GET /predictions/history
 * Retrieves all check-ups and prediction history for the authenticated user.
 */
export async function getPredictionHistory(req, res) {
  try {
    const userId = req.user.user_id;
    if (!userId) {
      return res.status(401).json({
        message: 'Unauthorized. User ID is missing!'
      });
    }

    const { rows } = await findPredictionHistoryByUserId(userId);

    // Group the flat query rows by check_up_id
    const historyMap = {};
    for (const row of rows) {
      if (!historyMap[row.check_up_id]) {
        historyMap[row.check_up_id] = {
          check_up_id: row.check_up_id,
          cholesterol_total: parseFloat(row.cholesterol),
          creatinine: parseFloat(row.creatinin),
          fbs: parseFloat(row.fbs),
          rbs: parseFloat(row.rbs),
          hgb: parseFloat(row.hgb),
          lymphocyte_percent: parseFloat(row.lymfosit),
          mch: parseFloat(row.mch),
          mchc: parseFloat(row.mchc),
          mcv: parseFloat(row.mcv),
          urea: parseFloat(row.ureum),
          wbc: parseFloat(row.wbc),
          created_at: row.check_up_created_at,
          predictions: []
        };
      }

      if (row.prediction_id) {
        historyMap[row.check_up_id].predictions.push({
          prediction_id: row.prediction_id,
          disease_id: row.disease_id,
          disease_name: row.disease_name,
          probability: parseFloat(row.probability),
          risk: row.risk
        });
      }
    }

    const historyList = Object.values(historyMap);

    res.status(200).json({
      message: 'Success to GET prediction history!',
      data: historyList
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving prediction history',
      error: error.message
    });
  }
}
