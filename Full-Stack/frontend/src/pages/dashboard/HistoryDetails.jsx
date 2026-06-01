import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { fetchWithAuth } from '../../utils/api.js';

import DetailsHeader from './history-details/DetailsHeader';
import ScreeningResult from './history-details/ScreeningResult';
import ParametersTable from './history-details/ParametersTable';
import RecommendationBoxes from './history-details/RecommendationBoxes';
import Disclaimer from './history-details/Disclaimer';

export default function HistoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    formatCheckUpDate,
    translateCategory,
    translateRisk,
    translateStatus,
    translateAbnormalText,
  } = useOutletContext();

  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const setActiveMenu = () => navigate('/dashboard');

  const parseAndFormatDate = (isoStr) => {
    if (!isoStr) return '';
    const date = new Date(isoStr);
    const monthsId = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const day = String(date.getDate()).padStart(2, '0');
    const month = monthsId[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day} ${month} ${year}, ${hours}.${minutes}`;
  };

  useEffect(() => {
    async function loadDetail() {
      try {
        setLoading(true);
        const response = await fetchWithAuth(`/predictions/history/${id}`);
        if (!response.ok) {
          throw new Error('Gagal mengambil detail riwayat');
        }
        const result = await response.json();
        const raw = result.data;

        // Cari prediksi utama dengan probabilitas tertinggi
        const mainPrediction = raw.predictions && raw.predictions.length > 0
          ? raw.predictions.reduce((prev, current) => (prev.probability > current.probability) ? prev : current)
          : { disease_name: 'Penyakit Dalam', probability: 0, risk: 'Low' };

        const checkStatus = (val, min, max) => {
          const num = parseFloat(val);
          if (num < min) return { status: 'Rendah', color: 'bg-[#F2C039] text-[#836512]' };
          if (num > max) return { status: 'Tinggi', color: 'bg-[#EB5050] text-[#890909]' };
          return { status: 'Normal', color: 'bg-[#17ADB4] text-[#084F63]' };
        };

        const parameters = {
          cholesterol: { value: String(raw.cholesterol_total), ...checkStatus(raw.cholesterol_total, 0, 200), unit: 'mg/dL', range: '0 - 200' },
          creatinine: { value: String(raw.creatinine), ...checkStatus(raw.creatinine, 0.6, 1.1), unit: 'mg/dL', range: '0.6 - 1.1' },
          fbs: { value: String(raw.fbs), ...checkStatus(raw.fbs, 70, 100), unit: 'mg/dL', range: '70 - 100' },
          rbs: { value: String(raw.rbs), ...checkStatus(raw.rbs, 70, 110), unit: 'mg/dL', range: '70 - 110' },
          hgb: { value: String(raw.hgb), ...checkStatus(raw.hgb, 12, 16), unit: 'g/dL', range: '12 - 16' },
          lymphocyte: { value: String(raw.lymphocyte_percent), ...checkStatus(raw.lymphocyte_percent, 20, 35), unit: '%', range: '20 - 35' },
          mch: { value: String(raw.mch), ...checkStatus(raw.mch, 27, 34), unit: 'pg', range: '27 - 34' },
          mchc: { value: String(raw.mchc), ...checkStatus(raw.mchc, 32, 36), unit: 'g/dL', range: '32 - 36' },
          mcv: { value: String(raw.mcv), ...checkStatus(raw.mcv, 80, 100), unit: 'fL', range: '80 - 100' },
          ureum: { value: String(raw.urea), ...checkStatus(raw.urea, 17, 43), unit: 'mg/dL', range: '17 - 43' },
          wbc: { value: String(raw.wbc), ...checkStatus(raw.wbc, 4, 11), unit: '10³/µL', range: '4 - 11' },
        };

        const abnormals = [];
        Object.entries(parameters).forEach(([key, param]) => {
          if (param.status !== 'Normal') {
            const displayName =
              key === 'cholesterol' ? 'Cholesterol Total' :
              key === 'creatinine' ? 'Creatinin' :
              key === 'fbs' ? 'FBS (Gula Darah Puasa)' :
              key === 'rbs' ? 'RBS (Gula Darah Sewaktu)' :
              key === 'hgb' ? 'Hgb (Hemoglobin)' :
              key === 'lymphocyte' ? 'Lymfosit' : key.toUpperCase();
            abnormals.push(`${displayName} (${param.status.toLowerCase()})`);
          }
        });

        const categoryText = mainPrediction.disease_name || 'Penyakit Dalam';
        const riskText = mainPrediction.risk === 'High' ? 'Tinggi' : mainPrediction.risk === 'Medium' ? 'Sedang' : 'Rendah';
        const abnormalText = abnormals.length > 0
          ? `Ditemukan ${abnormals.length} parameter abnormal: ${abnormals.join(', ')}. Pola hasil paling mendekati kategori ${categoryText.toLowerCase()} dengan tingkat risiko ${riskText.toLowerCase()}.`
          : 'Semua parameter dalam rentang normal.';

        const scores = {
          penyakitDalam: 0.2,
          paruParu: 0.15,
          jantung: 0.23,
        };
        raw.predictions.forEach((pred) => {
          if (pred.disease_name.toLowerCase().includes('dalam')) {
            scores.penyakitDalam = pred.probability;
          } else if (pred.disease_name.toLowerCase().includes('paru')) {
            scores.paruParu = pred.probability;
          } else if (pred.disease_name.toLowerCase().includes('jantung')) {
            scores.jantung = pred.probability;
          }
        });

        setSelectedHistoryItem({
          id: raw.check_up_id,
          category: categoryText,
          date: parseAndFormatDate(raw.created_at),
          risk: riskText,
          riskColor: mainPrediction.risk === 'High'
            ? 'bg-[#EB5050] text-[#530505]'
            : mainPrediction.risk === 'Medium'
              ? 'bg-[#F2C039] text-[#836512]'
              : 'bg-[#17ADB4] text-[#084F63]',
          score: Math.round(mainPrediction.probability * 100),
          parameters,
          abnormalText,
          scores
        });
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadDetail();
  }, [id]);

  if (loading) {
    return <div className="p-12 text-center text-brand-primary font-poppins">Memuat detail riwayat...</div>;
  }

  if (error || !selectedHistoryItem) {
    return <div className="p-12 text-center text-rose-600 font-poppins">{error || 'Data riwayat tidak ditemukan'}</div>;
  }

  return (
    <div className="w-full text-left animate-fade-in select-none">
      <DetailsHeader
        formatCheckUpDate={formatCheckUpDate}
        selectedHistoryItem={selectedHistoryItem}
        setActiveMenu={setActiveMenu}
      />

      <ScreeningResult
        selectedHistoryItem={selectedHistoryItem}
        translateCategory={translateCategory}
        translateRisk={translateRisk}
      />

      <ParametersTable
        selectedHistoryItem={selectedHistoryItem}
        translateStatus={translateStatus}
      />

      <RecommendationBoxes
        selectedHistoryItem={selectedHistoryItem}
        translateAbnormalText={translateAbnormalText}
      />

      <Disclaimer />
    </div>
  );
}
