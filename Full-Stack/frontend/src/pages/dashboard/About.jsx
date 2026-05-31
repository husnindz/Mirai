import { useLanguage } from '../../context/LanguageContext.jsx';
import { ChevronRight } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
export default function About() {
  const navigate = useNavigate();
  const setActiveMenu = () => navigate('/dashboard');
  const { language, t } = useLanguage();

  const getTranslatedParamName = (name) => {
    if (name === 'FBS (Gula Darah Puasa)')
      return language === 'id' ? 'FBS (Gula Darah Puasa)' : 'FBS (Fasting Blood Sugar)';
    if (name === 'RBS (Gula Darah Sewaktu)')
      return language === 'id' ? 'RBS (Gula Darah Sewaktu)' : 'RBS (Random Blood Sugar)';
    if (name === 'Lymfosit') return language === 'id' ? 'Lymfosit' : 'Lymphocytes';
    if (name === 'Ureum') return language === 'id' ? 'Ureum' : 'Urea';
    return name;
  };

  const parametersReference = [
    { name: 'Cholesterol Total', range: '0 - 200', unit: 'mg/dL' },
    { name: 'Creatinin', range: '0.6 - 1.1', unit: 'mg/dL' },
    { name: 'FBS (Gula Darah Puasa)', range: '70 - 100', unit: 'mg/dL' },
    { name: 'RBS (Gula Darah Sewaktu)', range: '70 - 110', unit: 'mg/dL' },
    { name: 'Hgb (Hemoglobin)', range: '12 - 16', unit: 'g/dL' },
    { name: 'Lymfosit', range: '20 - 35', unit: '%' },
    { name: 'MCH', range: '27 - 34', unit: 'pg' },
    { name: 'MCHC', range: '32 - 36', unit: 'g/dL' },
    { name: 'MCV', range: '80 - 100', unit: 'fL' },
    { name: 'Ureum', range: '17 - 43', unit: 'mg/dL' },
    { name: 'WBC', range: '4 - 11', unit: '10³/µL' },
  ];

  return (
    <div className="w-full text-left animate-fade-in select-none">
      <div className="mb-10">
        <h1 className="font-montserrat font-bold sm:text-[48px] text-[32px] text-[#005868] leading-tight mb-2 tracking-tight">
          {t.menuAbout}
        </h1>
        <p className="font-poppins font-normal text-[20px] text-[#262626]">
          {language === 'id'
            ? 'Informasi tentang bagaimana aplikasi kami bekerja.'
            : 'Information about how our application works.'}
        </p>

        <nav className="flex items-center gap-2 mt-4 text-brand-primary font-montserrat font-semibold text-sm">
          <a
            href="#"
            className="hover:text-brand-primary/80"
            onClick={(e) => {
              e.preventDefault();
              setActiveMenu('Dashboard');
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
          <span className="text-slate-500">{t.menuAbout}</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-[28px] w-full mb-12">
        <div className="bg-[#EDFBFF] border border-[#AFAFAF]/10 rounded-[20px] p-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex gap-5 sm:h-[163px] min-h-[140px] h-auto pb-4 hover:translate-y-[-2px] transition-all duration-300">
          <div className="w-[100px] h-[100px] bg-brand-primary rounded-[5px] flex items-center justify-center shrink-0 shadow-inner">
            <svg
              className="w-12 h-12 text-[#77F9D0]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
              <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
              <path d="M12 5v14" />
              <path d="M12 9h4a2 2 0 0 0 2-2V6" />
              <path d="M12 9H8a2 2 0 0 1-2-2V6" />
              <path d="M12 13h4a2 2 0 0 1 2 2v1" />
              <path d="M12 13H8a2 2 0 0 0-2 2v1" />
            </svg>
          </div>
          <div className="text-left leading-normal">
            <h4 className="font-montserrat font-bold text-[16px] text-brand-primary mb-[6px]">
              {language === 'id' ? 'Algoritma ML' : 'ML Algorithm'}
            </h4>
            <p className="font-montserrat font-medium text-[12px] text-[#262626] wrap-wrap-break-words leading-relaxed">
              {language === 'id'
                ? 'Klasifikasi multi-kategori berdasarkan skoring tertimbang dari 11 parameter lab. Setiap parameter berkontribusi pada 3 kategori penyakit sesuai relevansinya.'
                : 'Multi-category classification based on weighted scoring of 11 lab parameters. Each parameter contributes to 3 disease categories according to its relevance.'}
            </p>
          </div>
        </div>

        <div className="bg-[#EDFBFF] border border-[#AFAFAF]/10 rounded-[20px] p-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex gap-5 sm:h-[163px] min-h-[140px] h-auto pb-4 hover:translate-y-[-2px] transition-all duration-300">
          <div className="w-[100px] h-[100px] bg-brand-primary rounded-[5px] flex items-center justify-center shrink-0 shadow-inner">
            <svg
              className="w-12 h-12 text-[#77F9D0]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0v3.75"
              />
            </svg>
          </div>
          <div className="text-left leading-normal">
            <h4 className="font-montserrat font-bold text-[16px] text-brand-primary mb-[6px]">
              Preprocessing
            </h4>
            <p className="font-montserrat font-medium text-[12px] text-[#262626] wrap-break-words leading-relaxed">
              {language === 'id'
                ? 'Validasi rentang normal, deteksi nilai abnormal, normalisasi terhadap batas referensi, dan kalkulasi severity factor sebelum scoring.'
                : 'Validation of normal ranges, detection of abnormal values, normalization against reference limits, and calculation of severity factors before scoring.'}
            </p>
          </div>
        </div>

        <div className="bg-[#EDFBFF] border border-[#AFAFAF]/10 rounded-[20px] p-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex gap-5 sm:h-[163px] min-h-[140px] h-auto pb-4 hover:translate-y-[-2px] transition-all duration-300">
          <div className="w-[100px] h-[100px] bg-brand-primary rounded-[5px] flex items-center justify-center shrink-0 shadow-inner">
            <svg
              className="w-12 h-12 text-[#77F9D0]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
          </div>
          <div className="text-left leading-normal">
            <h4 className="font-montserrat font-bold text-[16px] text-brand-primary mb-[6px]">
              {language === 'id' ? 'Privasi Data' : 'Data Privacy'}
            </h4>
            <p className="font-montserrat font-medium text-[12px] text-[#262626] wrap-break-words leading-relaxed">
              {language === 'id'
                ? 'Setiap pengguna hanya dapat mengakses datanya sendiri. Row-Level Security memastikan data pasien tidak bocor antar akun.'
                : 'Each user can only access their own data. Row-Level Security ensures patient data does not leak between accounts.'}
            </p>
          </div>
        </div>

        <div className="bg-[#EDFBFF] border border-[#AFAFAF]/10 rounded-[20px] p-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex gap-5 sm:h-[163px] min-h-[140px] h-auto pb-4 hover:translate-y-[-2px] transition-all duration-300">
          <div className="w-[100px] h-[100px] bg-brand-primary rounded-[5px] flex items-center justify-center shrink-0 shadow-inner">
            <svg
              className="w-12 h-12 text-[#77F9D0]"
              fill="none"
              viewBox="0 0 32 32"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M 2.67 16 h 5.33 L 12 26.66 L 20 2.67 L 24 16 h 5.34" />
            </svg>
          </div>
          <div className="text-left leading-normal">
            <h4 className="font-montserrat font-bold text-[16px] text-brand-primary mb-[6px]">
              {language === 'id' ? 'Output Lengkap' : 'Complete Output'}
            </h4>
            <p className="font-montserrat font-medium text-[12px] text-[#262626] wrap-break-words leading-relaxed">
              {language === 'id'
                ? 'Indikasi penyakit utama, probabilitas, tingkat risiko, status tiap parameter, ringkasan, rekomendasi, dan export PDF.'
                : 'Indication of main disease, probability, risk level, status of each parameter, summary, recommendations, and PDF export.'}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="font-montserrat font-bold sm:text-[32px] text-[22px] text-brand-primary mb-6">
          {language === 'id' ? 'Parameter & Rentang Normal' : 'Parameters & Normal Ranges'}
        </h2>

        <div className="w-full bg-[#EDFBFF] border border-[#AFAFAF] rounded-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] overflow-hidden">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-[#D9F6FF] h-[61px] border-b border-[#AFAFAF]">
                  <th className="w-[40%] text-[#262626] sm:text-[20px] text-[13px] font-montserrat font-semibold py-2 px-2 sm:py-3 sm:px-8 text-left">
                    {language === 'id' ? 'Parameter' : 'Parameter'}
                  </th>
                  <th className="w-[35%] text-[#262626] sm:text-[20px] text-[13px] font-montserrat font-semibold py-2 px-2 sm:py-3 sm:px-8">
                    {t.normalRange || 'Rentang Normal'}
                  </th>
                  <th className="w-[25%] text-[#262626] sm:text-[20px] text-[13px] font-montserrat font-semibold py-2 px-2 sm:py-3 sm:px-8 text-center">
                    {t.unit || 'Satuan'}
                  </th>
                </tr>
              </thead>

              <tbody>
                {parametersReference.map((param, pIdx) => (
                  <tr
                    key={pIdx}
                    className="h-[40px] border-b border-[#AFAFAF]/20 hover:bg-white/30 transition-colors"
                  >
                    <td className="text-[#262626] sm:text-[14px] text-[11px] font-poppins font-medium py-1.5 px-2 sm:py-2.5 sm:px-8 text-left">
                      {getTranslatedParamName(param.name)}
                    </td>
                    <td className="text-[#262626] sm:text-[14px] text-[11px] font-arimo font-bold py-1.5 px-2 sm:py-2.5 sm:px-8">
                      {param.range}
                    </td>
                    <td className="text-[#262626] sm:text-[14px] text-[11px] font-poppins font-medium py-1.5 px-2 sm:py-2.5 sm:px-8 text-center">
                      {param.unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="w-full bg-brand-primary p-8 rounded-[20px] text-left text-white shadow-xl shadow-brand-primary/10 select-none">
        <div className="flex items-center gap-4 mb-4">
          <h3 className="font-montserrat font-bold text-[32px] text-[#77F9D0]">Disclaimer</h3>
          <div className="w-[38px] h-[38px] bg-[#F2C039] rounded-[5px] flex items-center justify-center shrink-0">
            <svg
              className="w-6 h-6 text-[#836512]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        <p className="font-montserrat font-medium text-[16px] text-[#F8FDFF] leading-relaxed w-full">
          {language === 'id'
            ? 'Mirai merupakan alat bantu skrining awal berbasis kecerdasan buatan dan aturan medis (rule-based system) yang dirancang untuk membantu pengguna dalam memperoleh gambaran awal terkait kondisi kesehatan berdasarkan data dan gejala yang dimasukkan. Sistem ini dikembangkan sebagai media pendukung analisis awal dan edukasi kesehatan, bukan sebagai alat diagnosis utama maupun pengganti tenaga medis profesional.'
            : 'Mirai is an early screening tool based on artificial intelligence and medical rules designed to help users obtain an initial overview of health conditions based on the data and symptoms entered. This system was developed as a support medium for initial analysis and health education, not as a primary diagnostic tool nor as a substitute for professional medical personnel.'}
        </p>
      </div>
    </div>
  );
}
