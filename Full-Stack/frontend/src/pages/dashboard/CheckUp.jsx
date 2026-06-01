import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import CheckUpHeader from './check-up/CheckUpHeader';
import CheckUpModal from './check-up/CheckUpModal';

export default function CheckUp() {
  const navigate = useNavigate();
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
      <CheckUpHeader setActiveMenu={setActiveMenu} />
      <CheckUpModal
        checkUpStep={checkUpStep}
        handleCloseCheckUp={handleCloseCheckUp}
        handlePrevStep={handlePrevStep}
        handleNextStep={handleNextStep}
        handleFinishCheckUp={handleFinishCheckUp}
        isStepValid={isStepValid}
        cholesterol={cholesterol}
        setCholesterol={setCholesterol}
        creatinine={creatinine}
        setCreatinine={setCreatinine}
        fbs={fbs}
        setFbs={setFbs}
        rbs={rbs}
        setRbs={setRbs}
        hgb={hgb}
        setHgb={setHgb}
        lymphocyte={lymphocyte}
        setLymphocyte={setLymphocyte}
        mch={mch}
        setMch={setMch}
        mchc={mchc}
        setMchc={setMchc}
        mcv={mcv}
        setMcv={setMcv}
        ureum={ureum}
        setUreum={setUreum}
        wbc={wbc}
        setWbc={setWbc}
      />
    </>
  );
}
