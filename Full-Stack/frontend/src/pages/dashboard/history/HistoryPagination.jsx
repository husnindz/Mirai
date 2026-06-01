import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

export default function HistoryPagination({ historyPage, setHistoryPage, totalPages }) {
  const { t } = useLanguage();

  return (
    <div className="px-8 py-5 border-t border-[#AFAFAF]/30 flex flex-col md:flex-row items-center justify-between gap-4">
      <button
        onClick={() => setHistoryPage((prev) => Math.max(prev - 1, 1))}
        disabled={historyPage === 1}
        className="w-[120px] h-[44px] bg-brand-primary text-brand-accent font-poppins font-medium text-[16px] rounded-[5px] flex items-center justify-center gap-2 hover:bg-[#0f4859] active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer shadow-sm"
      >
        <svg
          className="w-4 h-4 transform rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
        {t.backBtn || 'Back'}
      </button>

      <div className="flex items-center gap-2 font-arimo">
        {Array.from({ length: totalPages }).map((_, pageIdx) => {
          const pageNum = pageIdx + 1;
          const isActive = historyPage === pageNum;

          if (totalPages > 5 && pageNum > 2 && pageNum < totalPages - 1) {
            if (pageNum === 3) {
              return (
                <span
                  key="dots"
                  className="w-[21px] text-center text-brand-primary text-[16px] font-normal leading-[17px]"
                >
                  ...
                </span>
              );
            }
            return null;
          }

          return (
            <button
              key={pageNum}
              onClick={() => setHistoryPage(pageNum)}
              className={`w-[30px] h-[30px] rounded-[5px] text-[16px] font-bold flex items-center justify-center transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#77F9D0] text-[#005868]'
                  : 'text-brand-primary hover:bg-brand-primary/10'
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => setHistoryPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={historyPage === totalPages || totalPages === 0}
        className="w-[120px] h-[44px] bg-brand-primary text-brand-accent font-poppins font-medium text-[16px] rounded-[5px] flex items-center justify-center gap-2 hover:bg-[#0f4859] active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer shadow-sm"
      >
        {t.nextBtn || 'Next'}
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
