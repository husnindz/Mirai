import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

export default function Step1({ cholesterol, setCholesterol, creatinine, setCreatinine, fbs, setFbs }) {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-[15px] text-left">
      <div className="relative">
        <label className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1">
          {language === 'id' ? 'Kolesterol' : 'Cholesterol'}
        </label>
        <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
          <input
            type="text"
            placeholder={`${t.ex}: 180`}
            value={cholesterol}
            onChange={(e) => setCholesterol(e.target.value)}
            className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
          />
        </div>
      </div>

      <div className="relative">
        <label className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1">
          {language === 'id' ? 'Kreatinin' : 'Creatinine'}
        </label>
        <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
          <input
            type="text"
            placeholder={`${t.ex}: 0.7`}
            value={creatinine}
            onChange={(e) => setCreatinine(e.target.value)}
            className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
          />
        </div>
      </div>

      <div className="relative">
        <label className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1">
          {language === 'id' ? 'FBS (Gula Darah Puasa)' : 'FBS (Fasting Blood Sugar)'}
        </label>
        <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
          <input
            type="text"
            placeholder={`${t.ex}: 90`}
            value={fbs}
            onChange={(e) => setFbs(e.target.value)}
            className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
