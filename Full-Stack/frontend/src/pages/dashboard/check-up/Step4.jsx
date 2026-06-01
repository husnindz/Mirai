import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

export default function Step4({ ureum, setUreum, wbc, setWbc }) {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-[15px] text-left">
      <div className="relative">
        <label className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1">
          {language === 'id' ? 'Ureum' : 'Urea'}
        </label>
        <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
          <input
            type="text"
            placeholder={`${t.ex}: 28`}
            value={ureum}
            onChange={(e) => setUreum(e.target.value)}
            className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
          />
        </div>
      </div>

      <div className="relative">
        <label className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1">
          WBC
        </label>
        <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
          <input
            type="text"
            placeholder={`${t.ex}: 9`}
            value={wbc}
            onChange={(e) => setWbc(e.target.value)}
            className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
