import React, { useState } from 'react';

import { ChevronRight } from 'lucide-react';

import { useNavigate, useOutletContext } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.jsx';
export default function CheckUp() {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { historyList, setHistoryList } = useOutletContext();
  const setActiveMenu = (menu) => {
    if (menu === 'Dashboard') navigate('/dashboard');
    else navigate('/dashboard/' + menu.toLowerCase());
  };
  const onFinish = (newRecord) => {
    setHistoryList([newRecord, ...historyList]);
    navigate('/dashboard/history/' + newRecord.id);
  };
  const previousMenu = 'Dashboard';
  const [checkUpStep, setCheckUpStep] = useState(1);

  // Form States
  const [cholesterol, setCholesterol] = useState('');
  const [creatinine, setCreatinine] = useState('');
  const [fbs, setFbs] = useState('');
  const [rbs, setRbs] = useState('');
  const [hgb, setHgb] = useState('');
  const [lymphocyte, setLymphocyte] = useState('');
  const [mch, setMch] = useState('');
  const [mchc, setMchc] = useState('');
  const [mcv, setMcv] = useState('');
  const [ureum, setUreum] = useState('');
  const [wbc, setWbc] = useState('');

  const handleNextStep = () => {
    if (checkUpStep < 4) setCheckUpStep(checkUpStep + 1);
  };

  const handlePrevStep = () => {
    if (checkUpStep > 1) setCheckUpStep(checkUpStep - 1);
  };

  const isStepValid = () => {
    if (checkUpStep === 1) return cholesterol && creatinine && fbs;
    if (checkUpStep === 2) return rbs && hgb && lymphocyte;
    if (checkUpStep === 3) return mch && mchc && mcv;
    if (checkUpStep === 4) return ureum && wbc;
    return false;
  };

  const handleCloseCheckUp = () => {
    setActiveMenu(previousMenu);
  };

  const handleFinishCheckUp = () => {
    const cholVal = parseFloat(cholesterol) || 150;
    const creatinineVal = parseFloat(creatinine) || 0.9;
    const fbsVal = parseFloat(fbs) || 90;
    const rbsVal = parseFloat(rbs) || 115;
    const hgbVal = parseFloat(hgb) || 14;
    const lymphocyteVal = parseFloat(lymphocyte) || 35.8;
    const mchVal = parseFloat(mch) || 26.1;
    const mchcVal = parseFloat(mchc) || 34;
    const mcvVal = parseFloat(mcv) || 79.5;
    const ureumVal = parseFloat(ureum) || 28;
    const wbcVal = parseFloat(wbc) || 9;

    let score = 52;
    let category = 'Paru-paru';
    let risk = 'Rendah';
    let riskColor = 'bg-[#17ADB4] text-[#084F63]';

    if (cholVal > 240 || fbsVal > 125) {
      score = 82;
      category = 'Penyakit Dalam';
      risk = 'Tinggi';
      riskColor = 'bg-[#EB5050] text-[#530505]';
    } else if (cholVal > 200 || fbsVal > 100 || hgbVal < 11 || lymphocyteVal > 35) {
      score = 82;
      category = 'Penyakit Dalam';
      risk = 'Sedang';
      riskColor = 'bg-[#F2C039] text-[#836512]';
    }

    const today = new Date();
    const formattedDate =
      today.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }) +
      `, ${today.getHours().toString().padStart(2, '0')}.${today.getMinutes().toString().padStart(2, '0')}`;

    const checkStatus = (val, min, max) => {
      const num = parseFloat(val);
      if (num < min) return { status: 'Rendah', color: 'bg-[#F2C039] text-[#836512]' };
      if (num > max) return { status: 'Tinggi', color: 'bg-[#EB5050] text-[#890909]' };
      return { status: 'Normal', color: 'bg-[#17ADB4] text-[#084F63]' };
    };

    const paramResults = {
      cholesterol: {
        value: String(cholVal),
        ...checkStatus(cholVal, 0, 200),
        unit: 'mg/dL',
        range: '0 - 200',
      },
      creatinine: {
        value: String(creatinineVal),
        ...checkStatus(creatinineVal, 0.6, 1.1),
        unit: 'mg/dL',
        range: '0.6 - 1.1',
      },
      fbs: {
        value: String(fbsVal),
        ...checkStatus(fbsVal, 70, 100),
        unit: 'mg/dL',
        range: '70 - 100',
      },
      rbs: {
        value: String(rbsVal),
        ...checkStatus(rbsVal, 70, 110),
        unit: 'mg/dL',
        range: '70 - 110',
      },
      hgb: {
        value: String(hgbVal),
        ...checkStatus(hgbVal, 12, 16),
        unit: 'g/dL',
        range: '12 - 16',
      },
      lymphocyte: {
        value: String(lymphocyteVal),
        ...checkStatus(lymphocyteVal, 20, 35),
        unit: '%',
        range: '20 - 35',
      },
      mch: { value: String(mchVal), ...checkStatus(mchVal, 27, 34), unit: 'pg', range: '27 - 34' },
      mchc: {
        value: String(mchcVal),
        ...checkStatus(mchcVal, 32, 36),
        unit: 'g/dL',
        range: '32 - 36',
      },
      mcv: {
        value: String(mcvVal),
        ...checkStatus(mcvVal, 80, 100),
        unit: 'fL',
        range: '80 - 100',
      },
      ureum: {
        value: String(ureumVal),
        ...checkStatus(ureumVal, 17, 43),
        unit: 'mg/dL',
        range: '17 - 43',
      },
      wbc: {
        value: String(wbcVal),
        ...checkStatus(wbcVal, 4, 11),
        unit: '10³/µL',
        range: '4 - 11',
      },
    };

    const abnormals = [];
    Object.entries(paramResults).forEach(([key, param]) => {
      if (param.status !== 'Normal') {
        const displayName =
          key === 'cholesterol'
            ? 'Cholesterol Total'
            : key === 'creatinine'
              ? 'Creatinin'
              : key === 'fbs'
                ? 'FBS (Gula Darah Puasa)'
                : key === 'rbs'
                  ? 'RBS (Gula Darah Sewaktu)'
                  : key === 'hgb'
                    ? 'Hgb (Hemoglobin)'
                    : key === 'lymphocyte'
                      ? 'Lymfosit'
                      : key.toUpperCase();
        abnormals.push(`${displayName} (${param.status.toLowerCase()})`);
      }
    });

    const abnormalText =
      abnormals.length > 0
        ? `Ditemukan ${abnormals.length} parameter abnormal: ${abnormals.join(', ')}. Pola hasil paling mendekati kategori ${category.toLowerCase()} dengan tingkat risiko ${risk.toLowerCase()}.`
        : 'Semua parameter dalam rentang normal.';

    const newRecord = {
      id: Date.now(),
      category,
      date: formattedDate,
      risk,
      riskColor,
      score,
      parameters: paramResults,
      abnormalText,
      scores: {
        penyakitDalam: category === 'Penyakit Dalam' ? score / 100 : 0.35,
        paruParu: category === 'Paru-paru' ? score / 100 : 0.2,
        jantung: category === 'Jantung' ? score / 100 : 0.4,
      },
    };

    onFinish(newRecord);

    setCholesterol('');
    setCreatinine('');
    setFbs('');
    setRbs('');
    setHgb('');
    setLymphocyte('');
    setMch('');
    setMchc('');
    setMcv('');
    setUreum('');
    setWbc('');
  };

  return (
    <>
      <div className="w-full text-left animate-fade-in select-none">
        <div className="mb-10">
          <h1 className="font-montserrat font-bold sm:text-[48px] text-[32px] text-brand-primary leading-tight mb-2 tracking-tight">
            {t.menuCheckUp}
          </h1>
          <p className="font-poppins font-normal text-[20px] text-[#262626]">
            {language === 'id'
              ? 'Mohon lengkapi kuesioner medis di bawah ini untuk memulai skrining risiko penyakit.'
              : 'Please complete the medical questionnaire below to start the disease risk screening.'}
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
            <span className="text-slate-500">{t.menuCheckUp}</span>
          </nav>
        </div>

        <div className="w-full min-h-[480px] bg-[#D9F6FF]/20 border border-brand-primary/10 rounded-[20px] shadow-lg flex flex-col items-center justify-center p-8 text-center backdrop-blur-md relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#EDFBFF]/40 to-[#77F9D0]/5 opacity-30 pointer-events-none" />

          <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center mb-6">
            <svg
              className="w-10 h-10 text-brand-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="font-montserrat font-bold text-2xl text-brand-primary mb-2">
            {language === 'id' ? 'Formulir Skrining Kesehatan' : 'Health Screening Form'}
          </h3>
          <p className="font-poppins text-slate-500 text-sm max-w-[450px] leading-relaxed">
            {language === 'id'
              ? 'Silakan isi data hasil laboratorium medis Anda pada formulir interaktif di layar. Data Anda aman dan hanya digunakan untuk analisis probabilitas risiko kesehatan.'
              : 'Please fill in your medical laboratory results on the interactive form on screen. Your data is secure and only used for health risk probability analysis.'}
          </p>
        </div>
      </div>
      <div className="fixed inset-0 z-50 bg-[#F8FDFF]/76 backdrop-blur-[8px] flex items-center justify-center animate-fade-in p-4 overflow-y-auto">
        <div
          className={`w-full max-w-[507px] bg-[#F8FDFF] border border-[#AFAFAF] rounded-[20px] p-8 relative shadow-2xl transition-all duration-300 ${
            checkUpStep === 4 ? 'min-h-[424px]' : 'min-h-[503px]'
          }`}
        >
          <button
            onClick={handleCloseCheckUp}
            className="absolute top-4 right-4 w-[50px] h-[50px] bg-[#EB5050] text-[#530505] font-poppins font-medium text-[24px] rounded-[5px] flex items-center justify-center hover:bg-[#d63f3f] active:scale-95 transition-all shadow-md cursor-pointer z-50"
            aria-label="Close modal"
          >
            X
          </button>

          <div className="mt-4 flex flex-col h-full justify-between">
            <div className="space-y-[24px] mb-8">
              <h2 className="font-montserrat font-bold text-2xl text-brand-primary text-left border-b border-brand-primary/10 pb-2">
                {t.stepTitle.replace('{step}', checkUpStep)}
              </h2>

              {checkUpStep === 1 && (
                <div className="space-y-[15px] text-left">
                  <div className="relative">
                    <label className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1">
                      {language === 'id' ? 'Kolesterol' : 'Cholesterol'}
                    </label>
                    <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
                      <input
                        type="text"
                        placeholder={`${t.ex}: 180`}
                        value={cholesterol}
                        onChange={(e) => setCholesterol(e.target.value)}
                        className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1">
                      {language === 'id' ? 'Kreatinin' : 'Creatinine'}
                    </label>
                    <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
                      <input
                        type="text"
                        placeholder={`${t.ex}: 0.7`}
                        value={creatinine}
                        onChange={(e) => setCreatinine(e.target.value)}
                        className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1">
                      {language === 'id' ? 'FBS (Gula Darah Puasa)' : 'FBS (Fasting Blood Sugar)'}
                    </label>
                    <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
                      <input
                        type="text"
                        placeholder={`${t.ex}: 90`}
                        value={fbs}
                        onChange={(e) => setFbs(e.target.value)}
                        className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {checkUpStep === 2 && (
                <div className="space-y-[15px] text-left">
                  <div className="relative">
                    <label className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1">
                      {language === 'id' ? 'RBS (Gula Darah Sewaktu)' : 'RBS (Random Blood Sugar)'}
                    </label>
                    <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
                      <input
                        type="text"
                        placeholder={`${t.ex}: 90`}
                        value={rbs}
                        onChange={(e) => setRbs(e.target.value)}
                        className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1">
                      Hgb (Hemoglobin)
                    </label>
                    <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
                      <input
                        type="text"
                        placeholder={`${t.ex}: 10`}
                        value={hgb}
                        onChange={(e) => setHgb(e.target.value)}
                        className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1">
                      {language === 'id' ? 'Lymfosit %' : 'Lymphocytes %'}
                    </label>
                    <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
                      <input
                        type="text"
                        placeholder={`${t.ex}: 30`}
                        value={lymphocyte}
                        onChange={(e) => setLymphocyte(e.target.value)}
                        className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {checkUpStep === 3 && (
                <div className="space-y-[15px] text-left">
                  <div className="relative">
                    <label className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1">
                      MCH
                    </label>
                    <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
                      <input
                        type="text"
                        placeholder={`${t.ex}: 30`}
                        value={mch}
                        onChange={(e) => setMch(e.target.value)}
                        className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1">
                      MCHC
                    </label>
                    <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
                      <input
                        type="text"
                        placeholder={`${t.ex}: 35`}
                        value={mchc}
                        onChange={(e) => setMchc(e.target.value)}
                        className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1">
                      MCV
                    </label>
                    <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
                      <input
                        type="text"
                        placeholder={`${t.ex}: 90`}
                        value={mcv}
                        onChange={(e) => setMcv(e.target.value)}
                        className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {checkUpStep === 4 && (
                <div className="space-y-[15px] text-left">
                  <div className="relative">
                    <label className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1">
                      {language === 'id' ? 'Ureum' : 'Urea'}
                    </label>
                    <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
                      <input
                        type="text"
                        placeholder={`${t.ex}: 28`}
                        value={ureum}
                        onChange={(e) => setUreum(e.target.value)}
                        className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1">
                      WBC
                    </label>
                    <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
                      <input
                        type="text"
                        placeholder={`${t.ex}: 9`}
                        value={wbc}
                        onChange={(e) => setWbc(e.target.value)}
                        className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              <p className="text-[#5C7076] text-[14px] font-poppins font-normal leading-relaxed text-left">
                {language === 'id'
                  ? 'Pastikan input yang diberikan adalah nilai sebenarnya dari hasil pemeriksaan medis Anda untuk mendapatkan hasil analisis yang akurat.'
                  : 'Make sure the input provided is the actual value of your medical check-up to get accurate analysis results.'}
              </p>
            </div>

            <div className="flex items-center justify-between mt-auto">
              {checkUpStep > 1 ? (
                <button
                  onClick={handlePrevStep}
                  className="w-[120px] h-[44px] bg-transparent border border-brand-primary text-brand-primary font-poppins font-medium text-[16px] rounded-[5px] flex items-center justify-center gap-2 hover:bg-brand-primary/5 active:scale-95 transition-all cursor-pointer"
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
              ) : (
                <div />
              )}

              {checkUpStep < 4 ? (
                <button
                  onClick={handleNextStep}
                  disabled={!isStepValid()}
                  className="w-[120px] h-[44px] bg-brand-primary text-brand-accent font-poppins font-medium text-[16px] rounded-[5px] flex items-center justify-center gap-2 hover:bg-[#0f4859] active:scale-95 transition-all cursor-pointer shadow-md shadow-brand-primary/10 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
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
              ) : (
                <button
                  onClick={handleFinishCheckUp}
                  disabled={!isStepValid()}
                  className="w-[120px] h-[44px] bg-brand-primary text-brand-accent font-poppins font-medium text-[16px] rounded-[5px] flex items-center justify-center hover:bg-[#0f4859] active:scale-95 transition-all cursor-pointer shadow-md disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
                >
                  {t.finishBtn || 'Finish'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
