import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Service to generate clinical summaries and health recommendations using Google Gemini 1.5/2.0 Flash.
 * Securely communicates with Google AI Studio using the stored GEMINI_API_KEY.
 */
export async function generateSummaryAndSuggestions(labData, predictionResult) {
  const apiKey = process.env.GEMINI_API_KEY;
  
  // High-availability fallback if API key is not configured
  if (!apiKey) {
    console.warn("--- [Gemini AI] GEMINI_API_KEY is not set. Using static fallback template. ---");
    return getFallbackSummary(predictionResult);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Using the optimized, fast, and free-tier-friendly gemini-1.5-flash model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Format gender for prompt
    const genderText = labData.gender === 1 ? "Laki-laki" : "Perempuan";

    // Build the clinical context prompt
    const prompt = `
Anda adalah asisten AI Medis profesional yang empatik, andal, dan cerdas bernama Mirai Health Assistant.
Tugas Anda adalah memberikan ringkasan rekam medis klinis singkat dan saran kesehatan berdasarkan data laboratorium pasien serta hasil prediksi model jaringan saraf (Neural Network) kami.

DATA PASIEN:
- Jenis Kelamin: ${genderText}
- Umur: ${labData.age} tahun

HASIL UJI LABORATORIUM PASIEN:
- Kolesterol Total: ${labData.cholesterol_total} mg/dL (Normal: < 200)
- Creatinin (Ginjal): ${labData.creatinine} mg/dL (Normal: Laki-laki 0.6-1.2, Perempuan 0.5-1.1)
- Fasting Blood Sugar (FBS): ${labData.fbs} mg/dL (Normal: 70-100)
- Random Blood Sugar (RBS): ${labData.rbs} mg/dL (Normal: < 140)
- Hemoglobin (HGB): ${labData.hgb} g/dL (Normal: Laki-laki 13.5-17.5, Perempuan 12.0-15.5)
- Lymfosit%: ${labData.lymphocyte_percent}% (Normal: 20-40)
- MCH: ${labData.mch} pg (Normal: 27-33)
- MCHC: ${labData.mchc} g/dL (Normal: 32-36)
- MCV: ${labData.mcv} fL (Normal: 80-100)
- Ureum: ${labData.urea} mg/dL (Normal: 15-45)
- Sel Darah Putih (WBC): ${labData.wbc} /mcL (Normal: 4.000-11.000 atau 4.0-11.0)

PREDIKSI RISIKO PENYAKIT (Neural Network):
- Status Akhir Dominan: ${predictionResult.overall_status}
- Probabilitas Risiko Jantung: ${Math.round(predictionResult.predictions.find(p => p.disease_id === 1).probability * 100)}%
- Probabilitas Risiko Penyakit Dalam: ${Math.round(predictionResult.predictions.find(p => p.disease_id === 2).probability * 100)}%
- Probabilitas Risiko Paru-paru: ${Math.round(predictionResult.predictions.find(p => p.disease_id === 3).probability * 100)}%

INSTRUKSI OUTPUT:
1. Kembalikan response Anda wajib berupa format JSON terstruktur dengan kunci exact: "summary" dan "suggestion".
2. Di dalam "summary", berikan ringkasan medis klinis dalam Bahasa Indonesia yang ringkas (maksimal 80 kata). Jelaskan kondisi kesehatan pasien secara objektif namun empatik, sebutkan parameter lab mana saja yang tidak normal (terlalu tinggi/rendah), dan hubungkan secara logis dengan status risiko dominan hasil prediksi AI (Jantung, Paru, atau Penyakit Dalam).
3. Di dalam "suggestion", berikan saran kesehatan, pola makan (diet), aktivitas fisik, dan langkah medis lanjutan yang relevan dan praktis dalam Bahasa Indonesia. Format sebagai tulisan paragraf dengan poin-poin bullet list yang bersih dan rapi menggunakan penulisan markdown standar.

Wajib kembalikan response dalam bentuk JSON valid dengan skema:
{
  "summary": "Tulis ringkasan medis di sini...",
  "suggestion": "Tulis saran-saran kesehatan dan tindakan medis terstruktur di sini..."
}
`;

    // Call the Gemini API with structured JSON output configuration
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    const responseText = result.response.text();
    const parsedResult = JSON.parse(responseText);

    return {
      summary: parsedResult.summary || "",
      suggestion: parsedResult.suggestion || ""
    };

  } catch (error) {
    console.error("--- [Gemini AI] Error calling Gemini API: ---", error.message);
    // Graceful fallback to avoid throwing a 500 server error to the patient
    return getFallbackSummary(predictionResult);
  }
}

/**
 * Clean clinical fallback templates to guarantee high availability
 */
function getFallbackSummary(predictionResult) {
  const status = predictionResult.overall_status;
  
  if (status === "Normal") {
    return {
      summary: "Secara keseluruhan, hasil pemeriksaan laboratorium Anda menunjukkan kondisi yang baik dan berada dalam rentang normal. AI kami mendeteksi tingkat risiko penyakit yang sangat rendah pada organ Jantung, Paru-paru, dan Penyakit Dalam lainnya.",
      suggestion: "* **Pola Makan**: Pertahankan diet sehat seimbang tinggi serat, sayuran, dan protein rendah lemak.\n* **Aktivitas**: Lakukan olahraga kardio sedang seperti jalan kaki atau bersepeda 150 menit per minggu.\n* **Pemeriksaan berkala**: Lakukan pemeriksaan laboratorium rutin minimal 1 tahun sekali untuk pencegahan dini."
    };
  }

  if (status === "Jantung") {
    return {
      summary: "AI mendeteksi adanya indikasi peningkatan risiko terkait kondisi Jantung Anda berdasarkan parameter profil laboratorium Anda. Beberapa nilai lab terindikasi memerlukan perhatian medis lebih lanjut.",
      suggestion: "* **Tindakan Medis**: Sangat disarankan untuk berkonsultasi dengan Dokter Spesialis Jantung (Kardiolog) untuk pemeriksaan elektrokardiogram (EKG) atau echocardiography.\n* **Pola Makan**: Batasi asupan lemak jenuh, gorengan, bersantan, garam berlebih, dan makanan olahan.\n* **Gaya Hidup**: Hindari stres berlebih, pastikan istirahat cukup, dan hindari asap rokok/aktivitas fisik yang terlalu berat secara mendadak."
    };
  }

  if (status === "Paru-paru") {
    return {
      summary: "Hasil analisis laboratorium dan prediksi AI menunjukkan adanya potensi risiko kesehatan yang berkaitan dengan sistem pernapasan atau Paru-paru Anda. Diperlukan evaluasi klinis lanjutan.",
      suggestion: "* **Tindakan Medis**: Konsultasikan dengan Dokter Spesialis Paru (Pulmonolog) untuk melakukan tes spirometri atau rontgen dada (X-Ray).\n* **Gaya Hidup**: Hindari paparan debu, polusi udara, zat kimia berbahaya, dan asap rokok secara mutlak.\n* **Aktivitas**: Lakukan latihan pernapasan ringan secara rutin untuk mengoptimalkan kapasitas paru-paru Anda."
    };
  }

  // Fallback for "Penyakit Dalam" or general risks
  return {
    summary: "Berdasarkan data laboratorium Anda, AI kami mengidentifikasi adanya potensi gangguan kesehatan pada kategori Penyakit Dalam (seperti gangguan fungsi hati, ginjal, atau diabetes) yang perlu mendapat evaluasi medis profesional.",
    suggestion: "* **Tindakan Medis**: Jadwalkan konsultasi dengan Dokter Spesialis Penyakit Dalam (Sp.PD) untuk mendiskusikan hasil lab ginjal/ureum/gula darah Anda secara mendalam.\n* **Pola Makan**: Kurangi makanan manis/tinggi gula sederhana jika kadar gula darah tinggi, dan minum air putih minimal 2 liter per hari untuk kesehatan ginjal.\n* **Monitoring**: Lakukan pemantauan mandiri terhadap tekanan darah dan kadar gula darah secara teratur."
  };
}
