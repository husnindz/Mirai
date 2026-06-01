import React from 'react';

export default function HistoryItem({
  item,
  handleDrillDownResult,
  translateCategory,
  formatCheckUpDate,
  translateRisk,
}) {
  return (
    <div
      onClick={() => handleDrillDownResult(item)}
      className="bg-[#D9F6FF] rounded-xl p-4 flex justify-between items-start cursor-pointer hover:scale-[1.01] hover:shadow-md hover:bg-[#c8f1fd] transition-all duration-200 ring-0 hover:ring-1 hover:ring-brand-primary/30"
    >
      <div className="space-y-1 text-left">
        <span className="font-poppins font-semibold text-[16px] text-brand-primary whitespace-nowrap">
          {translateCategory(item.category)}
        </span>
        <div className="text-[12px] font-poppins font-normal text-[#262626]">
          {formatCheckUpDate(item.date.split(',')[0])}
        </div>
        <div
          className={`inline-block px-3 py-0.5 mt-2 rounded-full text-[11px] font-poppins font-medium ${item.riskColor}`}
        >
          {translateRisk(item.risk)}
        </div>
      </div>
      <div className="font-arimo font-bold text-[24px] text-brand-primary">
        {item.score}
        <span className="font-poppins font-semibold">%</span>
      </div>
    </div>
  );
}
