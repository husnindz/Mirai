import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

export default function CheckUpHeader({ setActiveMenu }) {
  const { language, t } = useLanguage();

  return (
    <div className="w-full text-left animate-fade-in select-none">
      <div className="mb-10">
        <h1 className="font-montserrat font-bold sm:text-[48px] text-[32px] text-brand-primary leading-tight mb-2 tracking-tight">
          {t.menuCheckUp}
        </h1>
        <p className="font-poppins font-normal text-[20px] text-[#262626]">
          {language === 'id'
            ? 'Mohon lengkapi kuesioner medis di bawah ini untuk memulai skrining risiko penyakit.'
            : 'Please complete the medical questionnaire below to start the disease risk screening.'}
        </p>

        <nav className="flex items-center gap-2 mt-4 text-brand-primary font-montserrat font-semibold text-sm">
          <a
            href="#"
            className="hover:text-brand-primary/80"
            onClick={(e) => {
              e.preventDefault();
              setActiveMenu('Dashboard');
            }}
          >
            <svg className="w-5 h-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </a>
          <span>
            <ChevronRight />
          </span>
          <span className="text-slate-500">{t.menuCheckUp}</span>
        </nav>
      </div>

      <div className="w-full min-h-[480px] bg-[#D9F6FF]/20 border border-brand-primary/10 rounded-[20px] shadow-lg flex flex-col items-center justify-center p-8 text-center backdrop-blur-md relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-tr from-[#EDFBFF]/40 to-[#77F9D0]/5 opacity-30 pointer-events-none" />

        <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-10 h-10 text-brand-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
        <h3 className="font-montserrat font-bold text-2xl text-brand-primary mb-2">
          {language === 'id' ? 'Formulir Skrining Kesehatan' : 'Health Screening Form'}
        </h3>
        <p className="font-poppins text-slate-500 text-sm max-w-[450px] leading-relaxed">
          {language === 'id'
            ? 'Silakan isi data hasil laboratorium medis Anda pada formulir interaktif di layar. Data Anda aman dan hanya digunakan untuk analisis probabilitas risiko kesehatan.'
            : 'Please fill in your medical laboratory results on the interactive form on screen. Your data is secure and only used for health risk probability analysis.'}
        </p>
      </div>
    </div>
  );
}
