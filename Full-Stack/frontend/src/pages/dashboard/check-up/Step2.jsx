import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

export default function Step2({ rbs, setRbs, hgb, setHgb, lymphocyte, setLymphocyte }) {
  const { language, t } = useLanguage();

  return (
    <div className="space-y-[15px] text-left">
      <div className="relative">
        <label className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1">
          {language === 'id' ? 'RBS (Gula Darah Sewaktu)' : 'RBS (Random Blood Sugar)'}
        </label>
        <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
          <input
            type="text"
            placeholder={`${t.ex}: 90`}
            value={rbs}
            onChange={(e) => setRbs(e.target.value)}
            className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
          />
        </div>
      </div>

      <div className="relative">
        <label className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1">
          Hgb (Hemoglobin)
        </label>
        <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
          <input
            type="text"
            placeholder={`${t.ex}: 10`}
            value={hgb}
            onChange={(e) => setHgb(e.target.value)}
            className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
          />
        </div>
      </div>

      <div className="relative">
        <label className="block text-brand-primary text-[20px] font-montserrat font-normal mb-1">
          {language === 'id' ? 'Lymfosit %' : 'Lymphocytes %'}
        </label>
        <div className="w-full h-[30px] px-[14px] bg-[#EDFBFF] border border-[#8C8C8C] rounded-[5px] flex items-center">
          <input
            type="text"
            placeholder={`${t.ex}: 30`}
            value={lymphocyte}
            onChange={(e) => setLymphocyte(e.target.value)}
            className="w-full bg-transparent text-[#5C7076] font-poppins text-[13px] placeholder:text-[#5C7076]/65 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
