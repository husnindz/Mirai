import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

export default function AboutParameters() {
  const { language, t } = useLanguage();

  const getTranslatedParamName = (name) => {
    if (name === 'FBS (Gula Darah Puasa)')
      return language === 'id' ? 'FBS (Gula Darah Puasa)' : 'FBS (Fasting Blood Sugar)';
    if (name === 'RBS (Gula Darah Sewaktu)')
      return language === 'id' ? 'RBS (Gula Darah Sewaktu)' : 'RBS (Random Blood Sugar)';
    if (name === 'Lymfosit') return language === 'id' ? 'Lymfosit' : 'Lymphocytes';
    if (name === 'Ureum') return language === 'id' ? 'Ureum' : 'Urea';
    return name;
  };

  const parametersReference = [
    { name: 'Cholesterol Total', range: '0 - 200', unit: 'mg/dL' },
    { name: 'Creatinin', range: '0.6 - 1.1', unit: 'mg/dL' },
    { name: 'FBS (Gula Darah Puasa)', range: '70 - 100', unit: 'mg/dL' },
    { name: 'RBS (Gula Darah Sewaktu)', range: '70 - 110', unit: 'mg/dL' },
    { name: 'Hgb (Hemoglobin)', range: '12 - 16', unit: 'g/dL' },
    { name: 'Lymfosit', range: '20 - 35', unit: '%' },
    { name: 'MCH', range: '27 - 34', unit: 'pg' },
    { name: 'MCHC', range: '32 - 36', unit: 'g/dL' },
    { name: 'MCV', range: '80 - 100', unit: 'fL' },
    { name: 'Ureum', range: '17 - 43', unit: 'mg/dL' },
    { name: 'WBC', range: '4 - 11', unit: '10³/µL' },
  ];

  return (
    <div className="mb-12">
      <h2 className="font-montserrat font-bold sm:text-[32px] text-[22px] text-brand-primary mb-6">
        {language === 'id' ? 'Parameter & Rentang Normal' : 'Parameters & Normal Ranges'}
      </h2>

      <div className="w-full bg-[#EDFBFF] border border-[#AFAFAF] rounded-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-[#D9F6FF] h-[61px] border-b border-[#AFAFAF]">
                <th className="w-[40%] text-[#262626] sm:text-[20px] text-[13px] font-montserrat font-semibold py-2 px-2 sm:py-3 sm:px-8 text-left">
                  {language === 'id' ? 'Parameter' : 'Parameter'}
                </th>
                <th className="w-[35%] text-[#262626] sm:text-[20px] text-[13px] font-montserrat font-semibold py-2 px-2 sm:py-3 sm:px-8">
                  {t.normalRange || 'Rentang Normal'}
                </th>
                <th className="w-[25%] text-[#262626] sm:text-[20px] text-[13px] font-montserrat font-semibold py-2 px-2 sm:py-3 sm:px-8 text-center">
                  {t.unit || 'Satuan'}
                </th>
              </tr>
            </thead>

            <tbody>
              {parametersReference.map((param, pIdx) => (
                <tr
                  key={pIdx}
                  className="h-[40px] border-b border-[#AFAFAF]/20 hover:bg-white/30 transition-colors"
                >
                  <td className="text-[#262626] sm:text-[14px] text-[11px] font-poppins font-medium py-1.5 px-2 sm:py-2.5 sm:px-8 text-left">
                    {getTranslatedParamName(param.name)}
                  </td>
                  <td className="text-[#262626] sm:text-[14px] text-[11px] font-arimo font-bold py-1.5 px-2 sm:py-2.5 sm:px-8">
                    {param.range}
                  </td>
                  <td className="text-[#262626] sm:text-[14px] text-[11px] font-poppins font-medium py-1.5 px-2 sm:py-2.5 sm:px-8 text-center">
                    {param.unit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
