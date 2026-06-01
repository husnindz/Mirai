import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import HistoryItem from './HistoryItem';

export default function DashboardHistory({ historyList, handleDrillDownResult, formatCheckUpDate, translateCategory, translateRisk, navigate }) {
  const { t } = useLanguage();

  return (
    <div className="col-span-1 xl:col-span-4 bg-[#EDFBFF] border border-[#AFAFAF] rounded-[20px] p-6 shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-montserrat font-semibold text-[20px] text-[#262626]">
          {t.historyTitle}
        </h3>
        <button
          onClick={() => navigate('/dashboard/history')}
          className="text-xs text-brand-primary font-montserrat font-bold hover:underline"
        >
          {t.viewAllBtn}
        </button>
      </div>
      <div className="space-y-4 overflow-y-auto flex-1 pr-1 max-h-[350px]">
        {historyList.slice(0, 8).map((item) => (
          <HistoryItem
            key={item.id}
            item={item}
            handleDrillDownResult={handleDrillDownResult}
            formatCheckUpDate={formatCheckUpDate}
            translateCategory={translateCategory}
            translateRisk={translateRisk}
          />
        ))}
        {historyList.length === 0 && (
          <p className="text-slate-500 text-sm font-poppins py-6">{t.noRecordsText}</p>
        )}
      </div>
    </div>
  );
}
