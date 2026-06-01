import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default function DashboardChart({ historyList = [], translateCategory }) {
  const { language, t } = useLanguage();

  // Ambil maksimal 7 data pemeriksaan terbaru, lalu balikkan agar terurut kronologis (lama ke baru)
  const sortedHistory = [...historyList].slice(0, 7).reverse();

  // Map data riwayat riil ke format yang dimengerti oleh Recharts AreaChart
  const mappedChartData = sortedHistory.map((item) => {
    let dateLabel = '';
    try {
      const parts = item.date.split(' ');
      if (parts.length >= 2) {
        const day = parts[0]; // misal '16'
        const rawMonth = parts[1]; // misal 'Mei' atau 'May'
        const timePart = item.date.split(',')[1] || ''; // misal ' 13.21'
        let monthLabel = '';
        if (language === 'en') {
          monthLabel = rawMonth
            .replace('Januari', 'Jan').replace('Februari', 'Feb').replace('Maret', 'Mar')
            .replace('April', 'Apr').replace('Mei', 'May').replace('Juni', 'Jun')
            .replace('Juli', 'Jul').replace('Agustus', 'Aug').replace('September', 'Sep')
            .replace('Oktober', 'Oct').replace('November', 'Nov').replace('Desember', 'Dec');
        } else {
          monthLabel = rawMonth.slice(0, 3); // Ambil 3 huruf pertama, misal 'Mei', 'Jan'
        }
        dateLabel = `${day} ${monthLabel},${timePart}`; // Hasil: '16 Mei, 13.21'
      }
    } catch (e) {
      dateLabel = 'Check';
    }

    return {
      month: dateLabel || 'Check',
      dalam: Math.round((item.scores?.penyakitDalam || 0) * 100),
      jantung: Math.round((item.scores?.jantung || 0) * 100),
      paru: Math.round((item.scores?.paruParu || 0) * 100)
    };
  });

  // Gunakan data riil jika ada, jika tidak sediakan default state kosong agar chart tidak error
  const chartData = mappedChartData.length > 0
    ? mappedChartData
    : [{ month: language === 'id' ? 'Belum Ada Data' : 'No Data', dalam: 0, jantung: 0, paru: 0 }];

  return (
    <div className="col-span-1 xl:col-span-8 bg-[#EDFBFF] border border-[#AFAFAF] rounded-[20px] p-6 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-montserrat font-semibold text-[20px] text-[#262626]">
          {t.trackCheckupTitle}
        </h3>
      </div>

      <div className="w-full flex-1 min-h-[200px] mt-4 select-none">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorDalam" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#146178" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#146178" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorJantung" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1F78B4" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#1F78B4" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorParu" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#17ADB4" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#17ADB4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#A3A3A3', fontSize: 10, fontFamily: 'sans-serif' }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#A3A3A3', fontSize: 10, fontFamily: 'sans-serif' }}
            />
            <Tooltip
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
              labelStyle={{ fontWeight: 'bold', color: '#262626' }}
              formatter={(value, name) => [`${value}%`, name]}
            />
            <Area type="monotone" dataKey="dalam" name={translateCategory('Penyakit Dalam')} stroke="#146178" strokeWidth={2.5} fillOpacity={1} fill="url(#colorDalam)" activeDot={{ r: 6 }} />
            <Area type="monotone" dataKey="jantung" name={translateCategory('Jantung')} stroke="#1F78B4" strokeWidth={2.5} fillOpacity={1} fill="url(#colorJantung)" activeDot={{ r: 6 }} />
            <Area type="monotone" dataKey="paru" name={translateCategory('Paru-paru')} stroke="#17ADB4" strokeWidth={2.5} fillOpacity={1} fill="url(#colorParu)" activeDot={{ r: 6 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap items-center gap-6 mt-4 pl-10">
        <div className="flex items-center gap-2">
          <span className="w-[13px] h-[13px] bg-brand-primary rounded-[1px] inline-block" />
          <span className="text-[12px] font-montserrat font-normal text-[#262626]">
            {translateCategory('Penyakit Dalam')}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-[13px] h-[13px] bg-[#1F78B4] rounded-[1px] inline-block" />
          <span className="text-[12px] font-montserrat font-normal text-[#262626]">
            {translateCategory('Jantung')}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-[13px] h-[13px] bg-[#17ADB4] rounded-[1px] inline-block" />
          <span className="text-[12px] font-montserrat font-normal text-[#262626]">
            {translateCategory('Paru-paru')}
          </span>
        </div>
      </div>
    </div>
  );
}
