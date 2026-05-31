import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext.jsx';
import userAvatar from '../../assets/user-avatar.png';
import { ChevronRight } from 'lucide-react';

export default function DashboardHome({
  username = 'Jati Sri Pamungkas',
  email = 'jatispamungkas357@gmail.com',
}) {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const { historyList, formatCheckUpDate, translateCategory, translateRisk } = useOutletContext();

  const handleDrillDownResult = (item) => {
    navigate(`/dashboard/history/${item.id}`);
  };

  return (
    <>
      <div className="mb-10 text-left select-none animate-fade-in">
        <h1 className="font-montserrat font-bold sm:text-[48px] text-[32px] leading-tight mb-2 tracking-tight">
          <span className="text-[#262626]">{t.profileGreeting}, </span>
          <span className="text-brand-primary">{username}</span>
        </h1>
        <p className="font-poppins font-normal sm:text-[20px] text-[16px] text-[#262626]">
          {t.profileSubtitle}
        </p>

        <nav className="flex items-center gap-2 mt-4 text-brand-primary font-montserrat font-semibold text-sm">
          <a href="#" className="hover:text-brand-primary/80" onClick={(e) => e.preventDefault()}>
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
          <span className="text-slate-500">{t.menuDashboard}</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-12">
        <div className="col-span-1 xl:col-span-8 bg-[#EDFBFF] border border-[#AFAFAF] rounded-[20px] p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-montserrat font-semibold text-[20px] text-[#262626]">
              {t.trackCheckupTitle}
            </h3>
          </div>

          <div className="w-full flex-1 min-h-[200px] flex items-center justify-center relative select-none">
            <svg viewBox="0 0 524 218" className="w-full h-auto">
              <defs>
                <linearGradient id="dalamGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#146178" stopOpacity="0.40" />
                  <stop offset="100%" stopColor="#146178" stopOpacity="0.00" />
                </linearGradient>
                <linearGradient id="jantungGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1F78B4" stopOpacity="0.30" />
                  <stop offset="100%" stopColor="#1F78B4" stopOpacity="0.00" />
                </linearGradient>
                <linearGradient id="paruGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#17ADB4" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#17ADB4" stopOpacity="0.00" />
                </linearGradient>
              </defs>

              <line x1="42" y1="172" x2="512" y2="172" stroke="#E2E8F0" strokeWidth="1" />
              <text
                x="30"
                y="176"
                textAnchor="end"
                className="fill-[#A3A3A3] text-[10px] font-sans"
              >
                0
              </text>

              <line
                x1="42"
                y1="129"
                x2="512"
                y2="129"
                stroke="#E2E8F0"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <text
                x="30"
                y="133"
                textAnchor="end"
                className="fill-[#A3A3A3] text-[10px] font-sans"
              >
                25
              </text>

              <line
                x1="42"
                y1="86"
                x2="512"
                y2="86"
                stroke="#E2E8F0"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <text x="30" y="90" textAnchor="end" className="fill-[#A3A3A3] text-[10px] font-sans">
                50
              </text>

              <line
                x1="42"
                y1="43"
                x2="512"
                y2="43"
                stroke="#E2E8F0"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <text x="30" y="47" textAnchor="end" className="fill-[#A3A3A3] text-[10px] font-sans">
                75
              </text>

              <line x1="42" y1="10" x2="512" y2="10" stroke="#E2E8F0" strokeWidth="1" />
              <text x="30" y="14" textAnchor="end" className="fill-[#A3A3A3] text-[10px] font-sans">
                100
              </text>

              <text
                x="42"
                y="197"
                textAnchor="middle"
                className="fill-[#A3A3A3] text-[10px] font-sans"
              >
                Jan
              </text>
              <text
                x="160"
                y="197"
                textAnchor="middle"
                className="fill-[#A3A3A3] text-[10px] font-sans"
              >
                Feb
              </text>
              <text
                x="278"
                y="197"
                textAnchor="middle"
                className="fill-[#A3A3A3] text-[10px] font-sans"
              >
                Mar
              </text>
              <text
                x="396"
                y="197"
                textAnchor="middle"
                className="fill-[#A3A3A3] text-[10px] font-sans"
              >
                Apr
              </text>
              <text
                x="512"
                y="197"
                textAnchor="middle"
                className="fill-[#A3A3A3] text-[10px] font-sans"
              >
                {language === 'id' ? 'Mei' : 'May'}
              </text>

              <path
                d="M 42.5 172 L 42.5 148.76 C 82.5 148.76, 120.5 43.84, 160.5 43.84 C 200.5 43.84, 238.5 119.52, 278.5 119.52 C 318.5 119.52, 356.5 12.88, 396.5 12.88 C 436.5 12.88, 472.5 83.4, 512.5 83.4 L 512.5 172 Z"
                fill="url(#dalamGrad)"
              />

              <path
                d="M 42.5 172 L 42.5 54.16 C 82.5 54.16, 120.5 124.68, 160.5 124.68 C 200.5 124.68, 238.5 78.24, 278.5 78.24 C 318.5 78.24, 356.5 14.6, 396.5 14.6 C 436.5 14.6, 472.5 93.72, 512.5 93.72 L 512.5 172 Z"
                fill="url(#jantungGrad)"
              />

              <path
                d="M 42.5 172 L 42.5 78.24 C 82.5 78.24, 120.5 31.8, 160.5 31.8 C 200.5 31.8, 238.5 140.16, 278.5 140.16 C 318.5 140.16, 356.5 55.88, 396.5 55.88 C 436.5 55.88, 472.5 74.8, 512.5 74.8 L 512.5 172 Z"
                fill="url(#paruGrad)"
              />

              <path
                d="M 42.5 148.76 C 82.5 148.76, 120.5 43.84, 160.5 43.84 C 200.5 43.84, 238.5 119.52, 278.5 119.52 C 318.5 119.52, 356.5 12.88, 396.5 12.88 C 436.5 12.88, 472.5 83.4, 512.5 83.4"
                fill="none"
                stroke="#146178"
                strokeWidth="2.5"
              />
              <circle
                cx="42.5"
                cy="148.76"
                r="4.5"
                fill="#146178"
                stroke="#F8FDFF"
                strokeWidth="1.5"
              />
              <circle
                cx="160.5"
                cy="43.84"
                r="4.5"
                fill="#146178"
                stroke="#F8FDFF"
                strokeWidth="1.5"
              />
              <circle
                cx="278.5"
                cy="119.52"
                r="4.5"
                fill="#146178"
                stroke="#F8FDFF"
                strokeWidth="1.5"
              />
              <circle
                cx="396.5"
                cy="12.88"
                r="4.5"
                fill="#146178"
                stroke="#F8FDFF"
                strokeWidth="1.5"
              />
              <circle
                cx="512.5"
                cy="83.4"
                r="4.5"
                fill="#146178"
                stroke="#F8FDFF"
                strokeWidth="1.5"
              />

              <path
                d="M 42.5 54.16 C 82.5 54.16, 120.5 124.68, 160.5 124.68 C 200.5 124.68, 238.5 78.24, 278.5 78.24 C 318.5 78.24, 356.5 14.6, 396.5 14.6 C 436.5 14.6, 472.5 93.72, 512.5 93.72"
                fill="none"
                stroke="#1F78B4"
                strokeWidth="2.5"
              />
              <circle
                cx="42.5"
                cy="54.16"
                r="4.5"
                fill="#1F78B4"
                stroke="#F8FDFF"
                strokeWidth="1.5"
              />
              <circle
                cx="160.5"
                cy="124.68"
                r="4.5"
                fill="#1F78B4"
                stroke="#F8FDFF"
                strokeWidth="1.5"
              />
              <circle
                cx="278.5"
                cy="78.24"
                r="4.5"
                fill="#1F78B4"
                stroke="#F8FDFF"
                strokeWidth="1.5"
              />
              <circle
                cx="396.5"
                cy="14.6"
                r="4.5"
                fill="#1F78B4"
                stroke="#F8FDFF"
                strokeWidth="1.5"
              />
              <circle
                cx="512.5"
                cy="93.72"
                r="4.5"
                fill="#1F78B4"
                stroke="#F8FDFF"
                strokeWidth="1.5"
              />

              <path
                d="M 42.5 78.24 C 82.5 78.24, 120.5 31.8, 160.5 31.8 C 200.5 31.8, 238.5 140.16, 278.5 140.16 C 318.5 140.16, 356.5 55.88, 396.5 55.88 C 436.5 55.88, 472.5 74.8, 512.5 74.8"
                fill="none"
                stroke="#17ADB4"
                strokeWidth="2.5"
              />
              <circle
                cx="42.5"
                cy="78.24"
                r="4.5"
                fill="#17ADB4"
                stroke="#F8FDFF"
                strokeWidth="1.5"
              />
              <circle
                cx="160.5"
                cy="31.8"
                r="4.5"
                fill="#17ADB4"
                stroke="#F8FDFF"
                strokeWidth="1.5"
              />
              <circle
                cx="278.5"
                cy="140.16"
                r="4.5"
                fill="#17ADB4"
                stroke="#F8FDFF"
                strokeWidth="1.5"
              />
              <circle
                cx="396.5"
                cy="55.88"
                r="4.5"
                fill="#17ADB4"
                stroke="#F8FDFF"
                strokeWidth="1.5"
              />
              <circle
                cx="512.5"
                cy="74.8"
                r="4.5"
                fill="#17ADB4"
                stroke="#F8FDFF"
                strokeWidth="1.5"
              />
            </svg>
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

        <div className="col-span-1 xl:col-span-4 bg-[#EDFBFF] border border-[#AFAFAF] rounded-[20px] p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-montserrat font-semibold text-[20px] text-[#262626]">
              {t.historyTitle}
            </h3>
            <button
              onClick={() => navigate('/dashboard/history')}
              className="text-xs text-brand-primary font-montserrat font-bold hover:underline"
            >
              {t.viewAllBtn}
            </button>
          </div>
          <div className="space-y-4 overflow-y-auto flex-1 pr-1 max-h-[350px]">
            {historyList.slice(0, 8).map((item) => (
              <div
                key={item.id}
                className="bg-[#D9F6FF] rounded-xl p-4 flex justify-between items-start hover:scale-[1.01] transition-transform duration-200"
              >
                <div className="space-y-1 text-left">
                  <button
                    onClick={() => handleDrillDownResult(item)}
                    className="text-left font-poppins font-semibold text-[16px] text-brand-primary hover:text-[#0f4859] cursor-pointer whitespace-nowrap"
                  >
                    {translateCategory(item.category)}
                  </button>
                  <div className="text-[12px] font-poppins font-normal text-[#262626]">
                    {formatCheckUpDate(item.date.split(',')[0])}
                  </div>
                  <div
                    className={`inline-block px-3 py-0.5 mt-2 rounded-full text-[11px] font-poppins font-medium ${item.riskColor}`}
                  >
                    {translateRisk(item.risk)}
                  </div>
                </div>
                <div className="font-arimo font-bold text-[24px] text-brand-primary">
                  {item.score}
                  <span className="font-poppins font-semibold">%</span>
                </div>
              </div>
            ))}
            {historyList.length === 0 && (
              <p className="text-slate-500 text-sm font-poppins py-6">{t.noRecordsText}</p>
            )}
          </div>
        </div>
      </div>

      <div className="text-left">
        <h2 className="font-montserrat font-bold sm:text-[32px] text-[22px] text-brand-primary mb-6">
          {t.abnormalParametersTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 w-full">
          <div className="bg-[#EDFBFF] border border-[#AFAFAF] rounded-[20px] p-6 shadow-md shadow-brand-primary/5 flex flex-col justify-between h-[320px] hover:translate-y-[-4px] transition-transform duration-300 w-full">
            <div className="flex justify-between items-start">
              <h4 className="font-poppins font-medium text-[24px] text-black">
                {language === 'id' ? 'Lymfosit' : 'Lymphocyte'}
              </h4>
              <div className="w-[30px] h-[30px] bg-[#EB5050] rounded-md flex items-center justify-center text-white font-bold">
                <svg
                  className="w-5 h-5 text-[#890909]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </div>
            </div>

            <div className="text-right my-2">
              <span className="font-poppins font-semibold text-[64px] text-brand-primary leading-none">
                52%
              </span>
            </div>

            <p className="font-poppins font-normal text-[16px] text-black leading-snug">
              {t.lymphocyteDesc}
            </p>
          </div>

          <div className="bg-[#EDFBFF] border border-[#AFAFAF] rounded-[20px] p-6 shadow-md shadow-brand-primary/5 flex flex-col justify-between h-[320px] hover:translate-y-[-4px] transition-transform duration-300 w-full">
            <div className="flex justify-between items-start">
              <h4 className="font-poppins font-medium text-[24px] text-black">
                {language === 'id' ? 'Creatinin' : 'Creatinine'}
              </h4>
              <div className="w-[30px] h-[30px] bg-[#F2C039] rounded-md flex items-center justify-center text-white font-bold">
                <svg
                  className="w-5 h-5 text-[#836512]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </div>

            <div className="text-right my-2">
              <span className="font-poppins font-semibold text-[64px] text-brand-primary leading-none">
                0.4
              </span>
            </div>

            <p className="font-poppins font-normal text-[16px] text-black leading-snug">
              {t.creatinineDesc}
            </p>
          </div>

          <div className="bg-[#EDFBFF] border border-[#AFAFAF] rounded-[20px] p-6 shadow-md shadow-brand-primary/5 flex flex-col justify-between h-[320px] hover:translate-y-[-4px] transition-transform duration-300 w-full">
            <div className="flex justify-between items-start">
              <h4 className="font-poppins font-medium text-[24px] text-black">MCHC</h4>
              <div className="w-[30px] h-[30px] bg-[#F2C039] rounded-md flex items-center justify-center text-white font-bold">
                <svg
                  className="w-5 h-5 text-[#836512]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </div>

            <div className="text-right my-2">
              <span className="font-poppins font-semibold text-[64px] text-brand-primary leading-none">
                30
              </span>
            </div>

            <p className="font-poppins font-normal text-[16px] text-black leading-snug">
              {t.mchcDesc}
            </p>
          </div>

          <div className="bg-[#EDFBFF] border border-[#AFAFAF] rounded-[20px] p-6 shadow-md shadow-brand-primary/5 flex flex-col justify-between h-[320px] hover:translate-y-[-4px] transition-transform duration-300 w-full">
            <div className="flex justify-between items-start">
              <h4 className="font-poppins font-medium text-[24px] text-black">
                {language === 'id' ? 'Kolesterol' : 'Cholesterol'}
              </h4>
              <div className="w-[30px] h-[30px] bg-[#EB5050] rounded-md flex items-center justify-center text-white font-bold">
                <svg
                  className="w-5 h-5 text-[#890909]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              </div>
            </div>

            <div className="text-right my-2">
              <span className="font-poppins font-semibold text-[64px] text-brand-primary leading-none">
                245
              </span>
            </div>

            <p className="font-poppins font-normal text-[16px] text-black leading-snug">
              {t.cholesterolDesc}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
