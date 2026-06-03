import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import HistoryHeader from './history/HistoryHeader';
import HistoryTable from './history/HistoryTable';
import HistoryPagination from './history/HistoryPagination';
import DeleteConfirmModal from './history/DeleteConfirmModal';
import { fetchWithAuth } from '../../utils/api.js';

export default function History() {
  const { historyList, setHistoryList } = useOutletContext();

  const [historyPage, setHistoryPage] = useState(1);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(historyList.length / itemsPerPage);
  const indexOfLastItem = historyPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHistoryItems = historyList.slice(indexOfFirstItem, indexOfLastItem);

  const handleDeleteHistory = async (id) => {
    try {
      const response = await fetchWithAuth(`/predictions/history/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setHistoryList(historyList.filter((item) => item.id !== id));
      } else {
        console.error('Failed to delete history');
      }
    } catch (error) {
      console.error('Error deleting history:', error);
    }
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
