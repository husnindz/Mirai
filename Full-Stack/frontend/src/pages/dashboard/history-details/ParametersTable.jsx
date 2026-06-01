import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';

export default function ParametersTable({ selectedHistoryItem, translateStatus }) {
  const { language } = useLanguage();

  return (
    <div className="w-full bg-[#EDFBFF] border border-[#AFAFAF]/20 rounded-[20px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex flex-col mb-12 overflow-hidden text-left">
      <div className="px-[24px] py-[20px] border-b border-[#AFAFAF]/20">
        <h3 className="font-montserrat font-bold text-[24px] text-brand-primary">
          {language === 'id' ? 'Detail Parameter Anda' : 'Your Parameter Details'}
        </h3>
        <p className="font-poppins font-normal text-[14px] text-[#777777] mt-1">
          {language === 'id'
            ? 'Perbandingan hasil lab Anda dengan nilai rujukan normal.'
            : 'Comparison of your lab results with normal reference values.'}
        </p>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="bg-[#D9F6FF] h-[50px] border-b border-[#AFAFAF]/20">
              <th className="w-[30%] text-brand-primary sm:text-[16px] text-[12px] font-montserrat font-semibold py-2 px-2 sm:py-3 sm:px-8 text-left">
                Parameter
              </th>
              <th className="w-[20%] text-brand-primary sm:text-[16px] text-[12px] font-montserrat font-semibold py-2 px-2 sm:py-3 sm:px-8 text-right">
                {language === 'id' ? 'Hasil Anda' : 'Your Result'}
              </th>
              <th className="w-[25%] text-brand-primary sm:text-[16px] text-[12px] font-montserrat font-semibold py-2 px-2 sm:py-3 sm:px-4 text-center">
                Status
              </th>
              <th className="w-[25%] text-brand-primary sm:text-[16px] text-[12px] font-montserrat font-semibold py-2 px-2 sm:py-3 sm:px-8 text-right">
                {language === 'id' ? 'Nilai Rujukan' : 'Reference Value'}
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(selectedHistoryItem.parameters).map(([key, param]) => {
              const displayName =
                key === 'cholesterol'
                  ? 'Cholesterol Total'
                  : key === 'creatinine'
                    ? language === 'id'
                      ? 'Creatinin'
                      : 'Creatinine'
                    : key === 'fbs'
                      ? language === 'id'
                        ? 'FBS (Gula Darah Puasa)'
                        : 'FBS (Fasting Blood Sugar)'
                      : key === 'rbs'
                        ? language === 'id'
                          ? 'RBS (Gula Darah Sewaktu)'
                          : 'RBS (Random Blood Sugar)'
                        : key === 'hgb'
                          ? language === 'id'
                            ? 'Hgb (Hemoglobin)'
                            : 'Hgb (Hemoglobin)'
                          : key === 'lymphocyte'
                            ? language === 'id'
                              ? 'Lymfosit %'
                              : 'Lymphocytes %'
                            : key === 'mch'
                              ? 'MCH'
                              : key === 'mchc'
                                ? 'MCHC'
                                : key === 'mcv'
                                  ? 'MCV'
                                  : key === 'ureum'
                                    ? language === 'id'
                                      ? 'Ureum'
                                      : 'Urea'
                                    : key === 'wbc'
                                      ? 'WBC'
                                      : key.toUpperCase();

              return (
                <tr
                  key={key}
                  className="h-[40px] border-b border-[#AFAFAF]/20 hover:bg-white/30 transition-colors"
                >
                  <td className="text-[#262626] sm:text-[14px] text-[11px] font-poppins font-medium py-1.5 px-2 sm:py-2.5 sm:px-8 text-left">
                    {displayName}
                  </td>
                  <td className="text-[#262626] sm:text-[14px] text-[11px] font-arimo font-bold py-1.5 px-2 sm:py-2.5 sm:px-8 text-right">
                    {param.value}{' '}
                    <span className="text-[#777777] font-poppins font-normal text-[10px]">
                      {param.unit}
                    </span>
                  </td>
                  <td className="py-1.5 px-2 sm:py-2.5 sm:px-4 text-center">
                    <div
                      className={`inline-block px-3 py-1 rounded-full text-[12px] font-poppins font-semibold shadow-sm ${param.color}`}
                    >
                      {translateStatus(param.status)}
                    </div>
                  </td>
                  <td className="text-[#777777] sm:text-[14px] text-[11px] font-arimo font-normal py-1.5 px-2 sm:py-2.5 sm:px-8 text-right">
                    {param.range}{' '}
                    <span className="font-poppins font-normal text-[10px]">{param.unit}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
