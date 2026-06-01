import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import ButtonAction from './ButtonAction';

export default function HistoryTable({
  currentHistoryItems,
  indexOfFirstItem,
  setDeleteConfirmId,
}) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { formatCheckUpDate, translateCategory, translateRisk } = useOutletContext();

  const handleDrillDownResult = (item) => {
    navigate(`/dashboard/history/${item.id}`);
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-center border-collapse">
        <thead>
          <tr className="bg-[#D9F6FF] h-[60px] border-b border-[#AFAFAF]">
            <th className="w-[10%] text-brand-primary sm:text-[20px] text-[13px] font-montserrat font-semibold py-2 px-1.5 sm:py-3 sm:px-4">
              No
            </th>
            <th className="w-[28%] text-brand-primary sm:text-[20px] text-[13px] font-montserrat font-semibold py-2 px-1.5 sm:py-3 sm:px-4">
              {language === 'id' ? 'Tanggal' : 'Date'}
            </th>
            <th className="w-[24%] text-brand-primary sm:text-[20px] text-[13px] font-montserrat font-semibold py-2 px-1.5 sm:py-3 sm:px-4">
              {language === 'id' ? 'Indikasi' : 'Indication'}
            </th>
            <th className="w-[14%] text-brand-primary sm:text-[20px] text-[13px] font-montserrat font-semibold py-2 px-1.5 sm:py-3 sm:px-4">
              {language === 'id' ? 'Probabilitas' : 'Probability'}
            </th>
            <th className="w-[12%] text-brand-primary sm:text-[20px] text-[13px] font-montserrat font-semibold py-2 px-1.5 sm:py-3 sm:px-4">
              {language === 'id' ? 'Risiko' : 'Risk'}
            </th>
            <th className="w-[12%] text-brand-primary sm:text-[20px] text-[13px] font-montserrat font-semibold py-2 px-1.5 sm:py-3 sm:px-4">
              {language === 'id' ? 'Aksi' : 'Action'}
            </th>
          </tr>
        </thead>

        <tbody>
          {currentHistoryItems.map((item, index) => {
            const rowNum = indexOfFirstItem + index + 1;
            return (
              <tr
                key={item.id}
                className="h-[49px] border-b border-[#AFAFAF]/40 hover:bg-[#5BF2C2]/20 transition-colors cursor-pointer"
                onClick={() => handleDrillDownResult(item)}
              >
                <td className="text-[#262626] sm:text-[14px] text-[11px] font-poppins font-normal py-1.5 px-1.5 sm:py-2 sm:px-4">
                  {rowNum}
                </td>
                <td className="text-[#262626] sm:text-[14px] text-[11px] font-poppins font-normal py-1.5 px-1.5 sm:py-2 sm:px-4">
                  {formatCheckUpDate(item.date)}
                </td>

                <td className="py-1.5 px-1.5 sm:py-2 sm:px-4">
                  <span className="text-[#262626] sm:text-[14px] text-[11px] font-arimo font-normal whitespace-nowrap">
                    {translateCategory(item.category)}
                  </span>
                </td>

                <td className="text-[#262626] sm:text-[14px] text-[11px] font-arimo font-normal py-1.5 px-1.5 sm:py-2 sm:px-4">
                  {item.score}%
                </td>
                <td className="text-[#262626] sm:text-[14px] text-[11px] font-poppins font-normal py-1.5 px-1.5 sm:py-2 sm:px-4">
                  {translateRisk(item.risk)}
                </td>

                <td className="py-1.5 px-1.5 sm:py-2 sm:px-4">
                  <ButtonAction setDeleteConfirmId={setDeleteConfirmId} item={item} />
                </td>
              </tr>
            );
          })}

          {currentHistoryItems.length < 10 &&
            Array.from({ length: 10 - currentHistoryItems.length }).map((_, idx) => (
              <tr key={`empty-${idx}`} className="h-[49px] border-b border-[#AFAFAF]/10">
                <td colSpan={6} className="py-2">
                  &nbsp;
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
