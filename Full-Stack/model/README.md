# 🚀 Mirai Model Microservice Deployment Guide (FastAPI)

Dokumen ini berisi panduan lengkap untuk melakukan hosting microservice prediksi penyakit **Mirai** (FastAPI + Keras/TensorFlow) di Virtual Private Server (VPS) kamu.

Ada dua metode utama yang bisa kamu pilih untuk hosting di VPS:
1. **Metode A (Sangat Direkomendasikan): Menggunakan Docker** (Praktis, terisolasi, dan bebas dari isu kecocokan versi library Python).
2. **Metode B: Menggunakan Python Virtual Environment (`venv`) & PM2** (Menjalankan secara native di VPS OS).

---

## 🐳 Metode A: Menggunakan Docker (Sangat Direkomendasikan)

Dengan Docker, semua library (termasuk TensorFlow dan Keras yang ukurannya cukup besar) akan dibundel ke dalam kontainer yang terisolasi. Kamu tidak perlu melakukan instalasi Python atau mengelola dependensi secara manual di VPS-mu.

### Langkah-langkah Deployment:
1. **Pastikan Docker sudah terinstal di VPS kamu.**
   Jika belum, instal menggunakan script resmi:
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   ```

2. **Masuk ke direktori model:**
   ```bash
   cd Full-Stack/model
   ```

3. **Build Docker Image:**
   ```bash
   docker build -t mirai-model-service .
   ```

4. **Jalankan Container:**
   Menjalankan microservice di port `8000` secara background dan otomatis restart jika VPS menyala ulang:
   ```bash
   docker run -d \
     --name mirai-model \
     -p 8000:8000 \
     --restart unless-stopped \
     mirai-model-service
   ```

5. **Selesai!** Kontainer model kamu sekarang aktif di port `8000`.

---

## 🐍 Metode B: Menggunakan Python Virtual Environment (`venv`) & PM2

Jika kamu lebih menyukai deployment secara native, kamu harus mengisolasi dependensi agar tidak bertabrakan dengan sistem VPS global.

### Langkah-langkah Deployment:
1. **Instal Python 3 dan Pip di VPS kamu (jika belum ada):**
   * **Ubuntu/Debian:**
     ```bash
     sudo apt update
     sudo apt install python3 python3-pip python3-venv -y
     ```

2. **Masuk ke direktori model dan buat Virtual Environment:**
   ```bash
   cd Full-Stack/model
   python3 -m venv venv
   ```

3. **Aktifkan Virtual Environment:**
   ```bash
   source venv/bin/activate
   ```

4. **Instal Dependensi dari `requirements.txt`:**
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

5. **Jalankan Aplikasi menggunakan PM2 (Agar tetap berjalan di background):**
   Pastikan kamu sudah menginstal Node.js dan PM2 (`npm install -g pm2`) di VPS-mu:
   ```bash
   pm2 start "uvicorn main:app --host 0.0.0.0 --port 8000" --name mirai-model
   ```

6. **Simpan konfigurasi PM2 agar otomatis jalan saat server reboot:**
   ```bash
   pm2 save
   pm2 startup
   ```

---

## 🔍 Verifikasi Deployment

Setelah server berhasil dideploy menggunakan salah satu metode di atas, kamu bisa melakukan pengujian untuk memastikan microservice bekerja dengan baik:

### 1. Uji Health-Check (GET `/`)
Buka browser atau gunakan curl untuk mengakses VPS-mu:
```bash
curl http://<IP_VPS_KAMU>:8000/
```
**Response Sukses:**
```json
{
  "status": "healthy",
  "service": "Mirai Keras ResNet DL Prediction Service",
  "model_loaded": true,
  "scaler_loaded": true
}
```

### 2. Uji Prediksi (POST `/predict`)
Kirim request POST berisi data lab pasien menggunakan curl:
```bash
curl -X POST http://<IP_VPS_KAMU>:8000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "gender": 1.0,
    "age": 45.0,
    "cholesterol_total": 180.0,
    "creatinine": 0.9,
    "fbs": 95.0,
    "rbs": 120.0,
    "hgb": 14.5,
    "lymphocyte_percent": 30.0,
    "mch": 28.0,
    "mchc": 33.0,
    "mcv": 88.0,
    "urea": 25.0,
    "wbc": 7500.0
  }'
```
**Response Sukses:**
```json
{
  "success": true,
  "predicted_class": 0,
  "overall_status": "Normal",
  "predictions": [
    { "disease_id": 1, "disease_name": "Jantung", "probability": 0.04562, "risk": "Low" },
    { "disease_id": 2, "disease_name": "Penyakit Dalam", "probability": 0.02115, "risk": "Low" },
    { "disease_id": 3, "disease_name": "Paru-paru", "probability": 0.01024, "risk": "Low" }
  ]
}
```
