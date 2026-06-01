import React from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';

import DetailsHeader from './history-details/DetailsHeader';
import ScreeningResult from './history-details/ScreeningResult';
import ParametersTable from './history-details/ParametersTable';
import RecommendationBoxes from './history-details/RecommendationBoxes';
import Disclaimer from './history-details/Disclaimer';

export default function HistoryDetails() {
  const { id } = useParams();
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
    <div className="w-full text-left animate-fade-in select-none">
      <DetailsHeader
        formatCheckUpDate={formatCheckUpDate}
        selectedHistoryItem={selectedHistoryItem}
        setActiveMenu={setActiveMenu}
      />

      <ScreeningResult
        selectedHistoryItem={selectedHistoryItem}
        translateCategory={translateCategory}
        translateRisk={translateRisk}
      />

      <ParametersTable
        selectedHistoryItem={selectedHistoryItem}
        translateStatus={translateStatus}
      />

      <RecommendationBoxes
        selectedHistoryItem={selectedHistoryItem}
        translateAbnormalText={translateAbnormalText}
      />

      <Disclaimer />
    </div>
  );
}
