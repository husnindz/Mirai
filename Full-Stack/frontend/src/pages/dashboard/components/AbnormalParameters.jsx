import React, { useEffect, useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { fetchWithAuth } from '../../../utils/api.js';
import AbnormalCard from './AbnormalCard';

export default function AbnormalParameters({ historyList = [] }) {
  const { language, t } = useLanguage();
  const [abnormalCards, setAbnormalCards] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!historyList || historyList.length === 0) {
      setAbnormalCards([]);
      return;
    }

    const latestCheckUp = historyList[0]; // Riwayat check-up paling terbaru
    setLoading(true);

    fetchWithAuth(`/predictions/history/${latestCheckUp.id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Gagal mengambil data parameter');
        return res.json();
      })
      .then((result) => {
        const raw = result.data;

        // Fungsi pembantu mengecek status abnormalitas
        const checkStatus = (val, min, max) => {
          const num = parseFloat(val);
          if (num < min) return { status: 'Rendah', colorType: 'yellow' };
          if (num > max) return { status: 'Tinggi', colorType: 'red' };
          return { status: 'Normal' };
        };

        const allParams = [
          { key: 'lymphocyte', title: language === 'id' ? 'Lymfosit' : 'Lymphocyte', value: raw.lymphocyte_percent, min: 20, max: 35, unit: '%', desc: t.lymphocyteDesc },
          { key: 'creatinine', title: language === 'id' ? 'Creatinin' : 'Creatinine', value: raw.creatinine, min: 0.6, max: 1.1, unit: 'mg/dL', desc: t.creatinineDesc },
          { key: 'mchc', title: 'MCHC', value: raw.mchc, min: 32, max: 36, unit: 'g/dL', desc: t.mchcDesc },
          { key: 'cholesterol', title: language === 'id' ? 'Kolesterol Total' : 'Cholesterol', value: raw.cholesterol_total, min: 0, max: 200, unit: 'mg/dL', desc: t.cholesterolDesc },
          { key: 'fbs', title: language === 'id' ? 'FBS (Gula Darah Puasa)' : 'FBS', value: raw.fbs, min: 70, max: 100, unit: 'mg/dL', desc: language === 'id' ? 'Kadar gula darah puasa di luar batas normal.' : 'Fasting blood sugar level is outside the normal range.' },
          { key: 'rbs', title: language === 'id' ? 'RBS (Gula Darah Sewaktu)' : 'RBS', value: raw.rbs, min: 70, max: 110, unit: 'mg/dL', desc: language === 'id' ? 'Kadar gula darah sewaktu di luar batas normal.' : 'Random blood sugar level is outside the normal range.' },
          { key: 'hgb', title: language === 'id' ? 'Hemoglobin' : 'Hemoglobin', value: raw.hgb, min: 12, max: 16, unit: 'g/dL', desc: language === 'id' ? 'Kadar hemoglobin darah di luar batas normal.' : 'Hemoglobin level is outside the normal range.' },
          { key: 'mch', title: 'MCH', value: raw.mch, min: 27, max: 34, unit: 'pg', desc: language === 'id' ? 'Kadar MCH sel darah merah di luar batas normal.' : 'MCH level is outside the normal range.' },
          { key: 'mcv', title: 'MCV', value: raw.mcv, min: 80, max: 100, unit: 'fL', desc: language === 'id' ? 'Kadar MCV sel darah merah di luar batas normal.' : 'MCV level is outside the normal range.' },
          { key: 'ureum', title: language === 'id' ? 'Ureum' : 'Urea', value: raw.urea, min: 17, max: 43, unit: 'mg/dL', desc: language === 'id' ? 'Kadar ureum darah di luar batas normal.' : 'Urea level is outside the normal range.' },
          { key: 'wbc', title: language === 'id' ? 'Sel Darah Putih' : 'WBC', value: raw.wbc, min: 4, max: 11, unit: '10³/µL', desc: language === 'id' ? 'Jumlah sel darah putih di luar batas normal.' : 'White blood cell count is outside the normal range.' }
        ];

        // Filter hanya yang abnormal (Tinggi / Rendah)
        const abnormalsOnly = [];
        let counter = 1;

        allParams.forEach((p) => {
          const statusInfo = checkStatus(p.value, p.min, p.max);
          if (statusInfo.status !== 'Normal') {
            abnormalsOnly.push({
              id: counter++,
              title: p.title,
              value: String(p.value),
              unit: p.unit,
              description: p.desc,
              colorType: statusInfo.colorType
            });
          }
        });

        setAbnormalCards(abnormalsOnly);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [historyList, language]);

  if (loading) {
    return <div className="text-left py-6 text-brand-primary font-poppins">Menganalisis parameter klinis terbaru...</div>;
  }

  return (
    <div className="text-left">
      <h2 className="font-montserrat font-bold sm:text-[32px] text-[22px] text-brand-primary mb-6">
        {t.abnormalParametersTitle}
      </h2>
      
      {abnormalCards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 w-full animate-fade-in">
          {abnormalCards.map((card) => (
            <AbnormalCard
              key={card.id}
              title={card.title}
              value={card.value}
              unit={card.unit}
              description={card.description}
              colorType={card.colorType}
            />
          ))}
        </div>
      ) : (
        <div className="w-full bg-[#EDFBFF] border border-[#17ADB4]/30 rounded-[20px] p-6 text-center text-brand-primary font-poppins font-medium shadow-sm">
          {language === 'id' 
            ? 'Semua parameter laboratorium pada pemeriksaan terakhir Anda dalam rentang normal.'
            : 'All laboratory parameters from your latest check-up are within the normal range.'}
        </div>
      )}
    </div>
  );
}
