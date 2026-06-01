import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

export default function DashboardChart({ translateCategory }) {
  const { language, t } = useLanguage();

  const chartData = [
    { month: language === 'id' ? 'Jan' : 'Jan', dalam: 25, jantung: 75, paru: 65 },
    { month: language === 'id' ? 'Feb' : 'Feb', dalam: 40, jantung: 45, paru: 85 },
    { month: language === 'id' ? 'Mar' : 'Mar', dalam: 35, jantung: 50, paru: 40 },
    { month: language === 'id' ? 'Apr' : 'Apr', dalam: 80, jantung: 90, paru: 70 },
    { month: language === 'id' ? 'Mei' : 'May', dalam: 60, jantung: 65, paru: 60 },
  ];

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
            />
            <Area type="natural" dataKey="dalam" name={translateCategory('Penyakit Dalam')} stroke="#146178" strokeWidth={2.5} fillOpacity={1} fill="url(#colorDalam)" activeDot={{ r: 6 }} />
            <Area type="natural" dataKey="jantung" name={translateCategory('Jantung')} stroke="#1F78B4" strokeWidth={2.5} fillOpacity={1} fill="url(#colorJantung)" activeDot={{ r: 6 }} />
            <Area type="natural" dataKey="paru" name={translateCategory('Paru-paru')} stroke="#17ADB4" strokeWidth={2.5} fillOpacity={1} fill="url(#colorParu)" activeDot={{ r: 6 }} />
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
