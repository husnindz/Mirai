import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

export default function DeleteConfirmModal({
  deleteConfirmId,
  setDeleteConfirmId,
  handleDeleteHistory,
}) {
  const { t } = useLanguage();

  if (deleteConfirmId === null) return null;

  return (
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

        <h3 className="font-montserrat font-bold text-xl text-slate-800 mb-2">{t.deleteTitle}</h3>
        <p className="font-poppins text-slate-500 text-sm leading-relaxed mb-6">{t.deleteBody}</p>

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
  );
}
