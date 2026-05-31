import React from 'react';
import { ChevronRight } from 'lucide-react';

import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.jsx';
export default function HistoryDetails() {
  const { id } = useParams();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const {
    historyList,
    formatCheckUpDate,
    translateCategory,
    translateRisk,
    translateStatus,
    translateAbnormalText,
  } = useOutletContext();

  const selectedHistoryItem = historyList.find((item) => item.id.toString() === id);
  const setActiveMenu = () => navigate('/dashboard');

  if (!selectedHistoryItem) {
    return <div className="p-12 text-center">Record not found</div>;
  }

  if (!selectedHistoryItem.parameters) {
    const isHigh = selectedHistoryItem.score > 70;
    selectedHistoryItem.parameters = {
      cholesterol: {
        value: isHigh ? '245' : '172',
        status: isHigh ? 'Tinggi' : 'Normal',
        color: isHigh ? 'bg-[#EB5050] text-[#890909]' : 'bg-[#17ADB4] text-[#084F63]',
        unit: 'mg/dL',
        range: '0 - 200',
      },
      creatinine: {
        value: '0.8',
        status: 'Normal',
        color: 'bg-[#17ADB4] text-[#084F63]',
        unit: 'mg/dL',
        range: '0.6 - 1.1',
      },
      fbs: {
        value: isHigh ? '130' : '88',
        status: isHigh ? 'Tinggi' : 'Normal',
        color: isHigh ? 'bg-[#EB5050] text-[#890909]' : 'bg-[#17ADB4] text-[#084F63]',
        unit: 'mg/dL',
        range: '70 - 100',
      },
      rbs: {
        value: '95',
        status: 'Normal',
        color: 'bg-[#17ADB4] text-[#084F63]',
        unit: 'mg/dL',
        range: '70 - 110',
      },
      hgb: {
        value: '14',
        status: 'Normal',
        color: 'bg-[#17ADB4] text-[#084F63]',
        unit: 'g/dL',
        range: '12 - 16',
      },
      lymphocyte: {
        value: '28',
        status: 'Normal',
        color: 'bg-[#17ADB4] text-[#084F63]',
        unit: '%',
        range: '20 - 35',
      },
      mch: {
        value: '29',
        status: 'Normal',
        color: 'bg-[#17ADB4] text-[#084F63]',
        unit: 'pg',
        range: '27 - 34',
      },
      mchc: {
        value: '34',
        status: 'Normal',
        color: 'bg-[#17ADB4] text-[#084F63]',
        unit: 'g/dL',
        range: '32 - 36',
      },
      mcv: {
        value: '88',
        status: 'Normal',
        color: 'bg-[#17ADB4] text-[#084F63]',
        unit: 'fL',
        range: '80 - 100',
      },
      ureum: {
        value: '25',
        status: 'Normal',
        color: 'bg-[#17ADB4] text-[#084F63]',
        unit: 'mg/dL',
        range: '17 - 43',
      },
      wbc: {
        value: '7',
        status: 'Normal',
        color: 'bg-[#17ADB4] text-[#084F63]',
        unit: '10³/µL',
        range: '4 - 11',
      },
    };
    selectedHistoryItem.abnormalText = isHigh
      ? 'Cholesterol Total (tinggi), FBS (tinggi)'
      : 'Semua parameter dalam rentang normal';
    selectedHistoryItem.scores = {
      penyakitDalam: isHigh ? 0.81 : 0.2,
      paruParu: isHigh ? 0.4 : 0.15,
      jantung: isHigh ? 0.56 : 0.23,
    };
  }

  return (
    <>
      <div className="w-full text-left animate-fade-in select-none">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 w-full">
          <div className="text-left">
            <h1 className="font-montserrat font-bold sm:text-[48px] text-[32px] text-brand-primary leading-none mb-2 tracking-tight">
              {language === 'id' ? 'Hasil' : 'Result'}
            </h1>
            <p className="font-poppins font-normal text-[20px] text-[#262626]">
              {formatCheckUpDate(selectedHistoryItem.date)}
            </p>

            <nav className="flex items-center gap-2 mt-4 text-brand-primary font-montserrat font-semibold text-sm">
              <a
                href="#"
                className="hover:text-brand-primary/80"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveMenu('Dashboard');
                  setSelectedHistoryItem(null);
                }}
              >
                <svg
                  className="w-5 h-5 inline"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
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
              <a
                href="#"
                className="hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedHistoryItem(null);
                }}
              >
                {t.menuHistory}
              </a>
              <span>
                <ChevronRight />
              </span>
              <span className="text-slate-500">{language === 'id' ? 'Hasil' : 'Result'}</span>
            </nav>
          </div>

          <div className="flex flex-col items-end gap-2 self-center">
            <div className="w-[125px] h-[30px] bg-[#17ADB4] rounded-full flex items-center justify-center shadow-sm">
              <span className="text-[#084F63] text-[14px] font-poppins font-medium">
                {language === 'id' ? 'Selesai' : 'Completed'}
              </span>
            </div>

            <button
              onClick={() =>
                alert(
                  language === 'id'
                    ? 'Laporan PDF berhasil diekspor!'
                    : 'PDF report exported successfully!',
                )
              }
              className="w-[140px] h-[44px] bg-[#5BF2C2] text-brand-primary font-poppins font-medium text-[16px] rounded-[5px] flex items-center justify-center gap-2 hover:bg-[#4be0b1] active:scale-95 transition-all shadow-md cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Export PDF
            </button>
          </div>
        </div>

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
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="font-montserrat font-bold sm:text-[32px] text-[22px] text-[#005868] mb-6">
            {language === 'id' ? 'Parameter & Rentang Normal' : 'Parameters & Normal Ranges'}
          </h2>

          <div className="w-full bg-[#EDFBFF] border border-[#AFAFAF] rounded-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] overflow-hidden">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="bg-[#D9F6FF] h-[61px] border-b border-[#AFAFAF]">
                    <th className="w-[35%] text-[#262626] sm:text-[20px] text-[13px] font-montserrat font-semibold py-2 px-2 sm:py-3 sm:px-8 text-left">
                      Parameter
                    </th>
                    <th className="w-[20%] text-[#262626] sm:text-[20px] text-[13px] font-montserrat font-semibold py-2 px-2 sm:py-3 sm:px-8 text-right">
                      {language === 'id' ? 'Nilai' : 'Value'}
                    </th>
                    <th className="w-[25%] text-[#262626] sm:text-[20px] text-[13px] font-montserrat font-semibold py-2 px-2 sm:py-3 sm:px-8">
                      {language === 'id' ? 'Rentang' : 'Range'}
                    </th>
                    <th className="w-[20%] text-[#262626] sm:text-[20px] text-[13px] font-montserrat font-semibold py-2 px-2 sm:py-3 sm:px-8 text-center">
                      {language === 'id' ? 'Status' : 'Status'}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {Object.entries(selectedHistoryItem.parameters).map(([key, param]) => {
                    const displayName =
                      key === 'cholesterol'
                        ? language === 'id'
                          ? 'Kolesterol Total'
                          : 'Total Cholesterol'
                        : key === 'creatinine'
                          ? language === 'id'
                            ? 'Kreatinin'
                            : 'Creatinine'
                          : key === 'fbs'
                            ? language === 'id'
                              ? 'FBS (Gula Darah Puasa)'
                              : 'FBS (Fasting Blood Sugar)'
                            : key === 'rbs'
                              ? language === 'id'
                                ? 'RBS (Gula Darah Sewaktu)'
                                : 'RBS (Random Blood Sugar)'
                              : key === 'hgb'
                                ? language === 'id'
                                  ? 'Hgb (Hemoglobin)'
                                  : 'Hgb (Hemoglobin)'
                                : key === 'lymphocyte'
                                  ? language === 'id'
                                    ? 'Lymfosit %'
                                    : 'Lymphocytes %'
                                  : key === 'mch'
                                    ? 'MCH'
                                    : key === 'mchc'
                                      ? 'MCHC'
                                      : key === 'mcv'
                                        ? 'MCV'
                                        : key === 'ureum'
                                          ? language === 'id'
                                            ? 'Ureum'
                                            : 'Urea'
                                          : key === 'wbc'
                                            ? 'WBC'
                                            : key.toUpperCase();

                    return (
                      <tr
                        key={key}
                        className="h-[40px] border-b border-[#AFAFAF]/20 hover:bg-white/30 transition-colors"
                      >
                        <td className="text-[#262626] sm:text-[14px] text-[11px] font-poppins font-medium py-1.5 px-2 sm:py-2.5 sm:px-8 text-left">
                          {displayName}
                        </td>
                        <td className="text-[#262626] sm:text-[14px] text-[11px] font-arimo font-bold py-1.5 px-2 sm:py-2.5 sm:px-8 text-right">
                          {param.value}{' '}
                          <span className="text-[#777777] font-poppins font-normal text-[10px]">
                            {param.unit}
                          </span>
                        </td>
                        <td className="text-[#262626] sm:text-[14px] text-[11px] font-arimo font-bold py-1.5 px-2 sm:py-2.5 sm:px-8">
                          {param.range}
                        </td>
                        <td className="py-1.5 px-2 sm:py-2.5 sm:px-8 text-center">
                          <div
                            className={`sm:w-[125px] w-[80px] sm:h-[30px] h-[22px] rounded-full flex items-center justify-center font-poppins font-semibold sm:text-[14px] text-[10px] mx-auto shadow-sm ${
                              param.status === 'Tinggi' || param.status === 'High'
                                ? 'bg-[#EB5050] text-[#890909]'
                                : param.status === 'Rendah' || param.status === 'Low'
                                  ? 'bg-[#F2C039] text-[#836512]'
                                  : 'bg-[#17ADB4] text-[#084F63]'
                            }`}
                          >
                            {translateStatus(param.status)}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px] w-full mb-12">
          <div className="bg-[#EDFBFF] border border-[#AFAFAF]/30 rounded-[20px] p-6 shadow-lg sm:h-[205px] h-auto min-h-[180px] pb-4 text-left">
            <h4 className="font-montserrat font-bold text-[24px] text-[#262626] mb-3">
              {language === 'id' ? 'Ringkasan' : 'Summary'}
            </h4>
            <p className="font-montserrat font-medium text-[16px] text-[#262626] leading-relaxed">
              {translateAbnormalText(selectedHistoryItem.abnormalText)}
            </p>
          </div>

          <div className="bg-[#EDFBFF] border-2 border-brand-accent rounded-[20px] p-6 shadow-lg sm:h-[205px] h-auto min-h-[180px] pb-4 text-left">
            <h4 className="font-montserrat font-bold text-[24px] text-brand-primary mb-3">
              {language === 'id' ? 'Rekomendasi Tindak Lanjut' : 'Follow-Up Recommendations'}
            </h4>
            <p className="font-montserrat font-medium text-[16px] text-slate-800 leading-relaxed">
              {selectedHistoryItem.category === 'Penyakit Dalam'
                ? language === 'id'
                  ? 'Disarankan kontrol ke dokter umum dalam 1-2 minggu, jaga pola makan rendah lemak & gula, perbanyak minum air putih, dan lakukan pemeriksaan ulang dalam 1 bulan.'
                  : 'It is recommended to consult a general practitioner within 1-2 weeks, maintain a low-fat & low-sugar diet, drink plenty of water, and repeat the examination in 1 month.'
                : language === 'id'
                  ? 'Lakukan olahraga kardio ringan secara teratur, kurangi konsumsi garam dan makanan kolesterol tinggi, kelola stress, dan periksakan tekanan darah rutin.'
                  : 'Perform light cardio exercise regularly, reduce intake of salt and high-cholesterol foods, manage stress, and check blood pressure routinely.'}
            </p>
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

          <p className="font-montserrat font-medium text-[16px] leading-relaxed text-[#F8FDFF] w-full">
            {language === 'id'
              ? 'Mirai merupakan alat bantu skrining awal berbasis kecerdasan buatan dan aturan medis (rule-based system) yang dirancang untuk membantu pengguna dalam memperoleh gambaran awal terkait kondisi kesehatan berdasarkan data dan gejala yang dimasukkan. Sistem ini dikembangkan sebagai media pendukung analisis awal dan edukasi kesehatan, bukan sebagai alat diagnosis utama maupun pengganti tenaga medis profesional.'
              : 'Mirai is an early screening tool based on artificial intelligence and medical rules designed to help users obtain an initial overview of health conditions based on the data and symptoms entered. This system was developed as a support medium for initial analysis and health education, not as a primary diagnostic tool nor as a substitute for professional medical personnel.'}
          </p>
        </div>
      </div>
    </>
  );
}
