import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.jsx';

export default function History() {
  const { language, t } = useLanguage();
  const { historyList, setHistoryList, formatCheckUpDate, translateCategory, translateRisk } =
    useOutletContext();
  const navigate = useNavigate();

  const [historyPage, setHistoryPage] = useState(1);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(historyList.length / itemsPerPage);
  const indexOfLastItem = historyPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHistoryItems = historyList.slice(indexOfFirstItem, indexOfLastItem);

  const handleDrillDownResult = (item) => {
    navigate(`/dashboard/history/${item.id}`);
  };

  const handleDeleteHistory = (id) => {
    setHistoryList(historyList.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="w-full text-left">
        <div className="mb-10">
          <h1 className="font-montserrat font-bold sm:text-[48px] text-[32px] text-brand-primary leading-tight mb-2 tracking-tight">
            {t.historyTitle || 'History'}
          </h1>
          <p className="font-poppins font-normal text-[20px] text-[#262626]">
            {language === 'id'
              ? 'Pantau semua riwayat pemeriksaan Anda di sini.'
              : 'Track all of your check-ups here.'}
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
            <span className="text-slate-500">{t.menuHistory}</span>
          </nav>
        </div>

        <div className="w-full bg-[#F8FDFF] border border-[#AFAFAF] rounded-[20px] shadow-lg overflow-hidden flex flex-col min-h-[601px] justify-between mb-8 select-none">
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
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirmId(item.id);
                          }}
                          className="sm:w-[30px] sm:h-[30px] w-[24px] h-[24px] bg-[#EB5050] rounded-[5px] flex items-center justify-center hover:bg-[#d63f3f] active:scale-95 transition-all shadow-sm cursor-pointer mx-auto"
                          title={language === 'id' ? 'Hapus riwayat' : 'Delete history'}
                        >
                          <svg
                            className="w-4 h-4 text-[#530505]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-50 bg-[#F8FDFF]/86 backdrop-blur-[6px] flex items-center justify-center animate-fade-in p-4">
          <div className="w-full max-w-[400px] bg-white border border-[#AFAFAF]/30 rounded-[20px] p-6 text-center shadow-2xl relative">
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>

            <h3 className="font-montserrat font-bold text-xl text-slate-800 mb-2">
              {t.deleteTitle}
            </h3>
            <p className="font-poppins text-slate-500 text-sm leading-relaxed mb-6">
              {t.deleteBody}
            </p>

            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-poppins font-medium text-sm rounded-lg transition-colors cursor-pointer"
              >
                {t.deleteCancel}
              </button>
              <button
                onClick={() => {
                  handleDeleteHistory(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-poppins font-medium text-sm rounded-lg transition-colors cursor-pointer shadow-md shadow-rose-600/10"
              >
                {t.deleteConfirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
