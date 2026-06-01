import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

export default function Step3({ mch, setMch, mchc, setMchc, mcv, setMcv }) {
  const { t } = useLanguage();

  return (
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
  );
}
