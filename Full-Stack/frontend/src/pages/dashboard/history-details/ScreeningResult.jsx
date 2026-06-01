import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

export default function ScreeningResult({ selectedHistoryItem, translateCategory, translateRisk }) {
  const { language } = useLanguage();

  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-[30px] w-full mb-12">
      <div className="col-span-1 xl:col-span-7 bg-[#EDFBFF] border border-[#AFAFAF]/20 rounded-[20px] p-[24px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex flex-col justify-between sm:h-[250px] min-h-[220px] h-auto pb-16">
        <div className="flex justify-between items-start">
          <div className="space-y-1 text-left">
            <span className="text-[#777777] text-[16px] font-poppins font-normal flex items-center gap-2">
              <span className="w-5 h-5 bg-brand-primary rounded-[5px] flex items-center justify-center shrink-0">
                <svg
                  className="w-3.5 h-3.5 text-[#77F9D0]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2"
                  />
                </svg>
              </span>
              {language === 'id' ? 'Indikasi Utama' : 'Primary Indication'}
            </span>
            <h2 className="font-montserrat font-bold sm:text-[32px] text-[22px] text-brand-primary leading-tight">
              {translateCategory(selectedHistoryItem.category)}
            </h2>
          </div>

          <div className="px-5 py-1 bg-[#F2C039] rounded-full text-[14px] font-poppins font-medium text-[#836512] shadow-sm">
            {language === 'id' ? 'Risiko' : 'Risk'} {translateRisk(selectedHistoryItem.risk)}
          </div>
        </div>

        <div className="relative w-full h-[40px] mt-6 flex items-center">
          <div className="w-full h-[20px] bg-linear-to-r from-[#17ADB4] via-[#F1C039] to-[#EB5050] rounded-[30px]" />

          <div
            className="absolute w-[30px] h-[30px] bg-[#5BF2C2] rounded-full border-2 border-[#005868] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] top-1/2 -translate-y-1/2"
            style={{ left: `calc(${selectedHistoryItem.score}% - 15px)` }}
          />

          <div
            className="absolute transform -translate-x-1/2 text-center font-poppins font-semibold text-[20px] text-brand-primary top-[36px]"
            style={{ left: `${selectedHistoryItem.score}%` }}
          >
            {selectedHistoryItem.score}%
          </div>
        </div>
      </div>

      <div className="col-span-1 xl:col-span-5 bg-[#EDFBFF] border border-[#AFAFAF]/20 rounded-[20px] p-[24px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex flex-col justify-between sm:h-[250px] min-h-[220px] h-auto pb-4 text-left">
        <span className="text-[#777777] text-[16px] font-poppins font-normal flex items-center gap-2 mb-2">
          <span className="w-5 h-5 bg-brand-primary rounded-[5px] flex items-center justify-center shrink-0">
            <svg
              className="w-3.5 h-3.5 text-[#77F9D0]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
              />
            </svg>
          </span>
          {language === 'id' ? 'Skor per Kategori' : 'Score per Category'}
        </span>

        <div className="space-y-[15px] flex-1 flex flex-col justify-center">
          <div className="space-y-1">
            <div className="flex justify-between font-poppins text-[14px] text-brand-primary leading-none">
              <span>{translateCategory('Penyakit Dalam')}</span>
              <span>{selectedHistoryItem.scores.penyakitDalam.toFixed(2)}</span>
            </div>
            <div className="w-full h-[12px] bg-[#96D8C3] rounded-[30px] relative overflow-hidden">
              <div
                className="h-full bg-brand-primary rounded-[30px] transition-all"
                style={{ width: `${selectedHistoryItem.scores.penyakitDalam * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between font-poppins text-[14px] text-brand-primary leading-none">
              <span>{translateCategory('Jantung')}</span>
              <span>{selectedHistoryItem.scores.jantung.toFixed(2)}</span>
            </div>
            <div className="w-full h-[12px] bg-[#96D8C3] rounded-[30px] relative overflow-hidden">
              <div
                className="h-full bg-brand-primary rounded-[30px] transition-all"
                style={{ width: `${selectedHistoryItem.scores.jantung * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between font-poppins text-[14px] text-brand-primary leading-none">
              <span>{translateCategory('Paru-paru')}</span>
              <span>{selectedHistoryItem.scores.paruParu.toFixed(2)}</span>
            </div>
            <div className="w-full h-[12px] bg-[#96D8C3] rounded-[30px] relative overflow-hidden">
              <div
                className="h-full bg-brand-primary rounded-[30px] transition-all"
                style={{ width: `${selectedHistoryItem.scores.paruParu * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
