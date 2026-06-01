import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

export default function DashboardHeader({ username }) {
  const { t } = useLanguage();

  return (
    <div className="mb-10 text-left select-none animate-fade-in">
      <h1 className="font-montserrat font-bold sm:text-[48px] text-[32px] leading-tight mb-2 tracking-tight">
        <span className="text-[#262626]">{t.profileGreeting}, </span>
        <span className="text-brand-primary">{username}</span>
      </h1>
      <p className="font-poppins font-normal sm:text-[20px] text-[16px] text-[#262626]">
        {t.profileSubtitle}
      </p>

      <nav className="flex items-center gap-2 mt-4 text-brand-primary font-montserrat font-semibold text-sm">
        <a href="#" className="hover:text-brand-primary/80" onClick={(e) => e.preventDefault()}>
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
        <span className="text-slate-500">{t.menuDashboard}</span>
      </nav>
    </div>
  );
}
