import { useLanguage } from '../context/LanguageContext.jsx';

export const useFormatCheckUpDate = () => {
  const { language } = useLanguage();

  const formatCheckUpDate = (dateStr) => {
    if (language === 'id') return dateStr;
    return dateStr
      .replace('Januari', 'January')
      .replace('Februari', 'February')
      .replace('Maret', 'March')
      .replace('April', 'April')
      .replace('Mei', 'May')
      .replace('Juni', 'June')
      .replace('Juli', 'July')
      .replace('Agustus', 'August')
      .replace('September', 'September')
      .replace('Oktober', 'October')
      .replace('November', 'November')
      .replace('Desember', 'December');
  };

  return { formatCheckUpDate };
};
