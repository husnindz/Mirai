import React from 'react';

export default function AbnormalCard({ title, value, unit, description, colorType }) {
  const isRed = colorType === 'red';
  const bgColor = isRed ? 'bg-[#EB5050]' : 'bg-[#F2C039]';
  const iconColor = isRed ? 'text-[#890909]' : 'text-[#836512]';

  return (
    <div className="bg-[#EDFBFF] border border-[#AFAFAF] rounded-[20px] p-6 shadow-md shadow-brand-primary/5 flex flex-col justify-between h-[320px] hover:translate-y-[-4px] transition-transform duration-300 w-full">
      <div className="flex justify-between items-start">
        <h4 className="font-poppins font-medium text-[24px] text-black">
          {title}
        </h4>
        <div className={`w-[30px] h-[30px] ${bgColor} rounded-md flex items-center justify-center text-white font-bold`}>
          <svg
            className={`w-5 h-5 ${iconColor}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isRed ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            )}
          </svg>
        </div>
      </div>

      <div className="text-right my-2">
        <span className="font-poppins font-semibold text-[64px] text-brand-primary leading-none">
          {value}
        </span>
        {unit && (
          <span className="font-poppins font-semibold text-[24px] text-brand-primary ml-1">
            {unit}
          </span>
        )}
      </div>

      <p className="font-poppins font-normal text-[16px] text-black leading-snug">
        {description}
      </p>
    </div>
  );
}
