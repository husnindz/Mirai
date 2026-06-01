import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

export default function AboutDisclaimer() {
  const { language } = useLanguage();

  return (
    <div className="w-full bg-brand-primary p-8 rounded-[20px] text-left text-white shadow-xl shadow-brand-primary/10 select-none">
      <div className="flex items-center gap-4 mb-4">
        <h3 className="font-montserrat font-bold text-[32px] text-[#77F9D0]">Disclaimer</h3>
        <div className="w-[38px] h-[38px] bg-[#F2C039] rounded-[5px] flex items-center justify-center shrink-0">
          <svg
            className="w-6 h-6 text-[#836512]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
      </div>

      <p className="font-montserrat font-medium text-[16px] text-[#F8FDFF] leading-relaxed w-full">
        {language === 'id'
          ? 'Mirai merupakan alat bantu skrining awal berbasis kecerdasan buatan dan aturan medis (rule-based system) yang dirancang untuk membantu pengguna dalam memperoleh gambaran awal terkait kondisi kesehatan berdasarkan data dan gejala yang dimasukkan. Sistem ini dikembangkan sebagai media pendukung analisis awal dan edukasi kesehatan, bukan sebagai alat diagnosis utama maupun pengganti tenaga medis profesional.'
          : 'Mirai is an early screening tool based on artificial intelligence and medical rules designed to help users obtain an initial overview of health conditions based on the data and symptoms entered. This system was developed as a support medium for initial analysis and health education, not as a primary diagnostic tool nor as a substitute for professional medical personnel.'}
      </p>
    </div>
  );
}
