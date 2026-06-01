import { useLanguage } from '../../../context/LanguageContext';

export default function ButtonAction({ setDeleteConfirmId, item }) {
  const { language } = useLanguage();
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setDeleteConfirmId(item.id);
      }}
      className="sm:w-[30px] sm:h-[30px] w-[24px] h-[24px] bg-[#EB5050] rounded-[5px] flex items-center justify-center hover:bg-[#d63f3f] active:scale-95 transition-all shadow-sm cursor-pointer mx-auto"
      title={language === 'id' ? 'Hapus riwayat' : 'Delete history'}
    >
      <svg className="w-4 h-4 text-[#530505]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </button>
  );
}
