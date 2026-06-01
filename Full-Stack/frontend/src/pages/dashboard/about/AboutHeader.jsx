import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

export default function AboutHeader() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const setActiveMenu = () => navigate('/dashboard');

  return (
    <div className="mb-10">
      <h1 className="font-montserrat font-bold sm:text-[48px] text-[32px] text-[#005868] leading-tight mb-2 tracking-tight">
        {t.menuAbout}
      </h1>
      <p className="font-poppins font-normal text-[20px] text-[#262626]">
        {language === 'id'
          ? 'Informasi tentang bagaimana aplikasi kami bekerja.'
          : 'Information about how our application works.'}
      </p>

      <nav className="flex items-center gap-2 mt-4 text-brand-primary font-montserrat font-semibold text-sm">
        <a
          href="#"
          className="hover:text-brand-primary/80"
          onClick={(e) => {
            e.preventDefault();
            setActiveMenu();
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
        <span className="text-slate-500">{t.menuAbout}</span>
      </nav>
    </div>
  );
}
