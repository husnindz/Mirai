import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';

export default function CheckUpModal({
  checkUpStep,
  handleCloseCheckUp,
  handlePrevStep,
  handleNextStep,
  handleFinishCheckUp,
  isStepValid,
  // Form props
  cholesterol,
  setCholesterol,
  creatinine,
  setCreatinine,
  fbs,
  setFbs,
  rbs,
  setRbs,
  hgb,
  setHgb,
  lymphocyte,
  setLymphocyte,
  mch,
  setMch,
  mchc,
  setMchc,
  mcv,
  setMcv,
  ureum,
  setUreum,
  wbc,
  setWbc,
}) {
  const { language, t } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 bg-[#F8FDFF]/76 backdrop-blur-sm flex items-center justify-center animate-fade-in p-4 overflow-y-auto">
      <div
        className={`w-full max-w-[507px] bg-[#F8FDFF] border border-[#AFAFAF] rounded-[20px] p-8 relative shadow-2xl transition-all duration-300 ${
          checkUpStep === 4 ? 'min-h-[424px]' : 'min-h-[503px]'
        }`}
      >
        <button
          onClick={handleCloseCheckUp}
          className="absolute top-4 right-4 w-[50px] h-[50px] bg-[#EB5050] text-[#530505] font-poppins font-medium text-[24px] rounded-[5px] flex items-center justify-center hover:bg-[#d63f3f] active:scale-95 transition-all shadow-md cursor-pointer z-50"
          aria-label="Close modal"
        >
          X
        </button>

        <div className="mt-4 flex flex-col h-full justify-between">
          <div className="space-y-[24px] mb-8">
            <h2 className="font-montserrat font-bold text-2xl text-brand-primary text-left border-b border-brand-primary/10 pb-2">
              {t.stepTitle.replace('{step}', checkUpStep)}
            </h2>

            {checkUpStep === 1 && (
              <Step1
                cholesterol={cholesterol}
                setCholesterol={setCholesterol}
                creatinine={creatinine}
                setCreatinine={setCreatinine}
                fbs={fbs}
                setFbs={setFbs}
              />
            )}

            {checkUpStep === 2 && (
              <Step2
                rbs={rbs}
                setRbs={setRbs}
                hgb={hgb}
                setHgb={setHgb}
                lymphocyte={lymphocyte}
                setLymphocyte={setLymphocyte}
              />
            )}

            {checkUpStep === 3 && (
              <Step3
                mch={mch}
                setMch={setMch}
                mchc={mchc}
                setMchc={setMchc}
                mcv={mcv}
                setMcv={setMcv}
              />
            )}

            {checkUpStep === 4 && (
              <Step4 ureum={ureum} setUreum={setUreum} wbc={wbc} setWbc={setWbc} />
            )}

            <p className="text-[#5C7076] text-[14px] font-poppins font-normal leading-relaxed text-left">
              {language === 'id'
                ? 'Pastikan input yang diberikan adalah nilai sebenarnya dari hasil pemeriksaan medis Anda untuk mendapatkan hasil analisis yang akurat.'
                : 'Make sure the input provided is the actual value of your medical check-up to get accurate analysis results.'}
            </p>
          </div>

          <div className="flex items-center justify-between mt-auto">
            {checkUpStep > 1 ? (
              <button
                onClick={handlePrevStep}
                className="w-[120px] h-[44px] bg-transparent border border-brand-primary text-brand-primary font-poppins font-medium text-[16px] rounded-[5px] flex items-center justify-center gap-2 hover:bg-brand-primary/5 active:scale-95 transition-all cursor-pointer"
              >
                <svg
                  className="w-4 h-4 transform rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                {t.backBtn || 'Back'}
              </button>
            ) : (
              <div />
            )}

            {checkUpStep < 4 ? (
              <button
                onClick={handleNextStep}
                disabled={!isStepValid()}
                className="w-[120px] h-[44px] bg-brand-primary text-brand-accent font-poppins font-medium text-[16px] rounded-[5px] flex items-center justify-center gap-2 hover:bg-[#0f4859] active:scale-95 transition-all cursor-pointer shadow-md shadow-brand-primary/10 disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
              >
                {t.nextBtn || 'Next'}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleFinishCheckUp}
                disabled={!isStepValid()}
                className="w-[120px] h-[44px] bg-brand-primary text-brand-accent font-poppins font-medium text-[16px] rounded-[5px] flex items-center justify-center hover:bg-[#0f4859] active:scale-95 transition-all cursor-pointer shadow-md disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none"
              >
                {t.finishBtn || 'Finish'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
