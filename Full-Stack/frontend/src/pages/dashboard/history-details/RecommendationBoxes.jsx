import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

export default function RecommendationBoxes({ selectedHistoryItem, translateAbnormalText }) {
  const { language } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] w-full mb-12">
      <div className="bg-[#EDFBFF] border border-[#AFAFAF]/30 rounded-[20px] p-6 shadow-lg sm:h-[205px] h-auto min-h-[180px] pb-4 text-left">
        <h4 className="font-montserrat font-bold text-[24px] text-[#262626] mb-3">
          {language === 'id' ? 'Ringkasan' : 'Summary'}
        </h4>
        <p className="font-montserrat font-medium text-[16px] text-[#262626] leading-relaxed">
          {translateAbnormalText(selectedHistoryItem.abnormalText)}
        </p>
      </div>

      <div className="bg-[#EDFBFF] border-2 border-brand-accent rounded-[20px] p-6 shadow-lg sm:h-[205px] h-auto min-h-[180px] pb-4 text-left">
        <h4 className="font-montserrat font-bold text-[24px] text-brand-primary mb-3">
          {language === 'id' ? 'Rekomendasi Tindak Lanjut' : 'Follow-Up Recommendations'}
        </h4>
        <p className="font-montserrat font-medium text-[16px] text-slate-800 leading-relaxed">
          {selectedHistoryItem.category === 'Penyakit Dalam'
            ? language === 'id'
              ? 'Disarankan kontrol ke dokter umum dalam 1-2 minggu, jaga pola makan rendah lemak & gula, perbanyak minum air putih, dan lakukan pemeriksaan ulang dalam 1 bulan.'
              : 'It is recommended to consult a general practitioner within 1-2 weeks, maintain a low-fat & low-sugar diet, drink plenty of water, and repeat the examination in 1 month.'
            : language === 'id'
              ? 'Lakukan olahraga kardio ringan secara teratur, kurangi konsumsi garam dan makanan kolesterol tinggi, kelola stress, dan periksakan tekanan darah rutin.'
              : 'Perform light cardio exercise regularly, reduce intake of salt and high-cholesterol foods, manage stress, and check blood pressure routinely.'}
        </p>
      </div>
    </div>
  );
}
