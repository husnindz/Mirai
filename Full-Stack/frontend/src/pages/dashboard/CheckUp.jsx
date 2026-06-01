import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { fetchWithAuth } from '../../utils/api.js';
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

    fetchWithAuth('/predictions', {
      method: 'POST',
      body: JSON.stringify({
        gender: 1, // default
        age: 25, // default
        cholesterol: cholVal,
        creatinin: creatinineVal,
        fbs: fbsVal,
        rbs: rbsVal,
        hgb: hgbVal,
        lymfosit: lymphocyteVal,
        mch: mchVal,
        mchc: mchcVal,
        mcv: mcvVal,
        ureum: ureumVal,
        wbc: wbcVal
      })
    })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error('Gagal memproses prediksi di backend');
      }
      const resJson = await res.json();
      const savedData = resJson.data;

      // Ambil prediksi dengan probabilitas tertinggi
      const mainPrediction = savedData.predictions && savedData.predictions.length > 0
        ? savedData.predictions.reduce((prev, current) => (prev.probability > current.probability) ? prev : current)
        : { disease_name: 'Penyakit Dalam', probability: 0, risk: 'Low' };

      const parseAndFormatDate = (isoStr) => {
        if (!isoStr) return '';
        const date = new Date(isoStr);
        const monthsId = [
          'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
          'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        const day = String(date.getDate()).padStart(2, '0');
        const month = monthsId[date.getMonth()];
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day} ${month} ${year}, ${hours}.${minutes}`;
      };

      const mapClassIdToName = (classVal) => {
        if (classVal === 1 || classVal === '1' || classVal === 'Jantung') return 'Jantung';
        if (classVal === 2 || classVal === '2' || classVal === 'Penyakit Dalam') return 'Penyakit Dalam';
        if (classVal === 3 || classVal === '3' || classVal === 'Paru-paru') return 'Paru-paru';
        // Fallback dari mainPrediction disease_id jika ada
        const mainPredId = mainPrediction.disease_id;
        if (mainPredId === 1 || mainPredId === '1') return 'Jantung';
        if (mainPredId === 2 || mainPredId === '2') return 'Penyakit Dalam';
        if (mainPredId === 3 || mainPredId === '3') return 'Paru-paru';
        return 'Penyakit Dalam'; // Fallback umum
      };

      const newRecord = {
        id: savedData.check_up_id,
        category: mapClassIdToName(savedData.predicted_class),
        date: parseAndFormatDate(savedData.created_at),
        risk: mainPrediction.risk === 'High' ? 'Tinggi' : mainPrediction.risk === 'Medium' ? 'Sedang' : 'Rendah',
        riskColor: mainPrediction.risk === 'High'
          ? 'bg-[#EB5050] text-[#530505]'
          : mainPrediction.risk === 'Medium'
            ? 'bg-[#F2C039] text-[#836512]'
            : 'bg-[#17ADB4] text-[#084F63]',
        score: Math.round(mainPrediction.probability * 100)
      };

      onFinish(newRecord);

      // Reset form states
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
    })
    .catch((err) => {
      alert('Error memproses check-up: ' + err.message);
    });
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
