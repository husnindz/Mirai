import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import HistoryHeader from './history/HistoryHeader';
import HistoryTable from './history/HistoryTable';
import HistoryPagination from './history/HistoryPagination';
import DeleteConfirmModal from './history/DeleteConfirmModal';

export default function History() {
  const { historyList, setHistoryList } = useOutletContext();

  const [historyPage, setHistoryPage] = useState(1);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(historyList.length / itemsPerPage);
  const indexOfLastItem = historyPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHistoryItems = historyList.slice(indexOfFirstItem, indexOfLastItem);

  const handleDeleteHistory = (id) => {
    setHistoryList(historyList.filter((item) => item.id !== id));
  };

  return (
    <>
      <div className="w-full text-left">
        <HistoryHeader />

        <div className="w-full bg-[#F8FDFF] border border-[#AFAFAF] rounded-[20px] shadow-lg overflow-hidden flex flex-col min-h-[601px] justify-between mb-8 select-none">
          <HistoryTable
            currentHistoryItems={currentHistoryItems}
            indexOfFirstItem={indexOfFirstItem}
            setDeleteConfirmId={setDeleteConfirmId}
          />

          <HistoryPagination
            historyPage={historyPage}
            setHistoryPage={setHistoryPage}
            totalPages={totalPages}
          />
        </div>
      </div>

      <DeleteConfirmModal
        deleteConfirmId={deleteConfirmId}
        setDeleteConfirmId={setDeleteConfirmId}
        handleDeleteHistory={handleDeleteHistory}
      />
    </>
  );
}
