import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

export default function DetailsHeader({ formatCheckUpDate, selectedHistoryItem }) {
  const { language, t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 w-full">
      <div className="text-left">
        <h1 className="font-montserrat font-bold sm:text-[48px] text-[32px] text-brand-primary leading-none mb-2 tracking-tight">
          {language === 'id' ? 'Hasil' : 'Result'}
        </h1>
        <p className="font-poppins font-normal text-[20px] text-[#262626]">
          {formatCheckUpDate(selectedHistoryItem.date)}
        </p>

        <nav className="flex items-center gap-2 mt-4 text-brand-primary font-montserrat font-semibold text-sm">
          <a
            href="#"
            className="hover:text-brand-primary/80"
            onClick={(e) => {
              e.preventDefault();
              navigate('/dashboard');
            }}
          >
            <svg
              className="w-5 h-5 inline"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
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
          <a
            href="#"
            className="hover:underline"
            onClick={(e) => {
              e.preventDefault();
              navigate('/dashboard/history');
            }}
          >
            {t.menuHistory}
          </a>
          <span>
            <ChevronRight />
          </span>
          <span className="text-slate-500">{language === 'id' ? 'Hasil' : 'Result'}</span>
        </nav>
      </div>

      <div className="flex flex-col items-end gap-2 self-center">
        <div className="w-[125px] h-[30px] bg-[#17ADB4] rounded-full flex items-center justify-center shadow-sm">
          <span className="text-[#084F63] text-[14px] font-poppins font-medium">
            {language === 'id' ? 'Selesai' : 'Completed'}
          </span>
        </div>

        <button
          onClick={() =>
            alert(
              language === 'id'
                ? 'Laporan PDF berhasil diekspor!'
                : 'PDF report exported successfully!',
            )
          }
          className="w-[140px] h-[44px] bg-[#5BF2C2] text-brand-primary font-poppins font-medium text-[16px] rounded-[5px] flex items-center justify-center gap-2 hover:bg-[#4be0b1] active:scale-95 transition-all shadow-md cursor-pointer"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Export PDF
        </button>
      </div>
    </div>
  );
}
