import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import DashboardHeader from './components/DashboardHeader';
import DashboardChart from './components/DashboardChart';
import DashboardHistory from './components/DashboardHistory';
import AbnormalParameters from './components/AbnormalParameters';

export default function DashboardHome() {
  const navigate = useNavigate();
  const { username, historyList, formatCheckUpDate, translateCategory, translateRisk } =
    useOutletContext();

  const handleDrillDownResult = (item) => {
    navigate(`/dashboard/history/${item.id}`);
  };

  return (
    <>
      <DashboardHeader username={username} />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-12">
        <DashboardChart historyList={historyList} translateCategory={translateCategory} />

        <DashboardHistory
          historyList={historyList}
          handleDrillDownResult={handleDrillDownResult}
          formatCheckUpDate={formatCheckUpDate}
          translateCategory={translateCategory}
          translateRisk={translateRisk}
          navigate={navigate}
        />
      </div>

      <AbnormalParameters historyList={historyList} />
    </>
  );
}
