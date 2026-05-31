import { useLanguage } from '../context/LanguageContext.jsx';

export const useTranslateCheckUp = () => {
  const { language, t } = useLanguage();

  const translateCategory = (cat) => {
    if (cat === 'Penyakit Dalam') return language === 'id' ? 'Penyakit Dalam' : 'Internal Disease';
    if (cat === 'Jantung') return language === 'id' ? 'Penyakit Jantung' : 'Heart Disease';
    if (cat === 'Paru-paru') return language === 'id' ? 'Penyakit Paru-paru' : 'Lung Disease';
    return cat;
  };

  const translateRisk = (rsk) => {
    if (rsk === 'Tinggi' || rsk === 'High') return t.riskHigh;
    if (rsk === 'Sedang' || rsk === 'Medium') return t.riskMedium;
    if (rsk === 'Rendah' || rsk === 'Low') return t.riskLow;
    return rsk;
  };

  const translateStatus = (stat) => {
    if (stat === 'Tinggi' || stat === 'High') return t.statusHigh;
    if (stat === 'Rendah' || stat === 'Low') return t.statusLow;
    if (stat === 'Normal') return t.statusNormal;
    return stat;
  };

  const translateAbnormalText = (text) => {
    if (!text) return '';
    if (language === 'id') return text;
    return text
      .replace('RBS (Gula Darah Sewaktu)', 'RBS (Random Blood Sugar)')
      .replace('Lymfosit', 'Lymphocytes')
      .replace('Kreatinin', 'Creatinine')
      .replace('Ureum', 'Urea')
      .replace('tinggi', 'high')
      .replace('rendah', 'low')
      .replace('Ditemukan', 'Found')
      .replace('parameter abnormal', 'abnormal parameters')
      .replace('Pola hasil paling mendekati kategori', 'The result pattern is closest to')
      .replace('dengan tingkat risiko', 'with a risk level of')
      .replace('penyakit dalam', 'internal disease')
      .replace('jantung', 'heart disease')
      .replace('paru-paru', 'lung disease')
      .replace('sedang', 'medium')
      .replace('Semua parameter dalam rentang normal.', 'All parameters are within normal range.');
  };

  return { translateCategory, translateRisk, translateStatus, translateAbnormalText };
};
