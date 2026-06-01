import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

export default function AboutFeatures() {
  const { language } = useLanguage();

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-[28px] w-full mb-12">
      <div className="bg-[#EDFBFF] border border-[#AFAFAF]/10 rounded-[20px] p-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex gap-5 sm:h-[163px] min-h-[140px] h-auto pb-4 hover:translate-y-[-2px] transition-all duration-300">
        <div className="w-[100px] h-[100px] bg-brand-primary rounded-[5px] flex items-center justify-center shrink-0 shadow-inner">
          <svg
            className="w-12 h-12 text-[#77F9D0]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
            <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
            <path d="M12 5v14" />
            <path d="M12 9h4a2 2 0 0 0 2-2V6" />
            <path d="M12 9H8a2 2 0 0 1-2-2V6" />
            <path d="M12 13h4a2 2 0 0 1 2 2v1" />
            <path d="M12 13H8a2 2 0 0 0-2 2v1" />
          </svg>
        </div>
        <div className="text-left leading-normal">
          <h4 className="font-montserrat font-bold text-[16px] text-brand-primary mb-[6px]">
            {language === 'id' ? 'Algoritma ML' : 'ML Algorithm'}
          </h4>
          <p className="font-montserrat font-medium text-[12px] text-[#262626] wrap-wrap-break-words leading-relaxed">
            {language === 'id'
              ? 'Klasifikasi multi-kategori berdasarkan skoring tertimbang dari 11 parameter lab. Setiap parameter berkontribusi pada 3 kategori penyakit sesuai relevansinya.'
              : 'Multi-category classification based on weighted scoring of 11 lab parameters. Each parameter contributes to 3 disease categories according to its relevance.'}
          </p>
        </div>
      </div>

      <div className="bg-[#EDFBFF] border border-[#AFAFAF]/10 rounded-[20px] p-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex gap-5 sm:h-[163px] min-h-[140px] h-auto pb-4 hover:translate-y-[-2px] transition-all duration-300">
        <div className="w-[100px] h-[100px] bg-brand-primary rounded-[5px] flex items-center justify-center shrink-0 shadow-inner">
          <svg
            className="w-12 h-12 text-[#77F9D0]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0v3.75"
            />
          </svg>
        </div>
        <div className="text-left leading-normal">
          <h4 className="font-montserrat font-bold text-[16px] text-brand-primary mb-[6px]">
            Preprocessing
          </h4>
          <p className="font-montserrat font-medium text-[12px] text-[#262626] wrap-break-words leading-relaxed">
            {language === 'id'
              ? 'Validasi rentang normal, deteksi nilai abnormal, normalisasi terhadap batas referensi, dan kalkulasi severity factor sebelum scoring.'
              : 'Validation of normal ranges, detection of abnormal values, normalization against reference limits, and calculation of severity factors before scoring.'}
          </p>
        </div>
      </div>

      <div className="bg-[#EDFBFF] border border-[#AFAFAF]/10 rounded-[20px] p-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex gap-5 sm:h-[163px] min-h-[140px] h-auto pb-4 hover:translate-y-[-2px] transition-all duration-300">
        <div className="w-[100px] h-[100px] bg-brand-primary rounded-[5px] flex items-center justify-center shrink-0 shadow-inner">
          <svg
            className="w-12 h-12 text-[#77F9D0]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
            />
          </svg>
        </div>
        <div className="text-left leading-normal">
          <h4 className="font-montserrat font-bold text-[16px] text-brand-primary mb-[6px]">
            {language === 'id' ? 'Privasi Data' : 'Data Privacy'}
          </h4>
          <p className="font-montserrat font-medium text-[12px] text-[#262626] wrap-break-words leading-relaxed">
            {language === 'id'
              ? 'Setiap pengguna hanya dapat mengakses datanya sendiri. Row-Level Security memastikan data pasien tidak bocor antar akun.'
              : 'Each user can only access their own data. Row-Level Security ensures patient data does not leak between accounts.'}
          </p>
        </div>
      </div>

      <div className="bg-[#EDFBFF] border border-[#AFAFAF]/10 rounded-[20px] p-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex gap-5 sm:h-[163px] min-h-[140px] h-auto pb-4 hover:translate-y-[-2px] transition-all duration-300">
        <div className="w-[100px] h-[100px] bg-brand-primary rounded-[5px] flex items-center justify-center shrink-0 shadow-inner">
          <svg
            className="w-12 h-12 text-[#77F9D0]"
            fill="none"
            viewBox="0 0 32 32"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 2.67 16 h 5.33 L 12 26.66 L 20 2.67 L 24 16 h 5.34" />
          </svg>
        </div>
        <div className="text-left leading-normal">
          <h4 className="font-montserrat font-bold text-[16px] text-brand-primary mb-[6px]">
            {language === 'id' ? 'Output Lengkap' : 'Complete Output'}
          </h4>
          <p className="font-montserrat font-medium text-[12px] text-[#262626] wrap-break-words leading-relaxed">
            {language === 'id'
              ? 'Indikasi penyakit utama, probabilitas, tingkat risiko, status tiap parameter, ringkasan, rekomendasi, dan export PDF.'
              : 'Indication of main disease, probability, risk level, status of each parameter, summary, recommendations, and PDF export.'}
          </p>
        </div>
      </div>
    </div>
  );
}
