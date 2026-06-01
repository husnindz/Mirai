import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import AbnormalCard from './AbnormalCard';

export default function AbnormalParameters() {
  const { language, t } = useLanguage();

  const abnormalCards = [
    {
      id: 1,
      title: language === 'id' ? 'Lymfosit' : 'Lymphocyte',
      value: '52',
      unit: '%',
      description: t.lymphocyteDesc,
      colorType: 'red',
    },
    {
      id: 2,
      title: language === 'id' ? 'Creatinin' : 'Creatinine',
      value: '0.4',
      unit: '',
      description: t.creatinineDesc,
      colorType: 'yellow',
    },
    {
      id: 3,
      title: 'MCHC',
      value: '30',
      unit: '',
      description: t.mchcDesc,
      colorType: 'yellow',
    },
    {
      id: 4,
      title: language === 'id' ? 'Kolesterol' : 'Cholesterol',
      value: '245',
      unit: '',
      description: t.cholesterolDesc,
      colorType: 'red',
    },
  ];

  return (
    <div className="text-left">
      <h2 className="font-montserrat font-bold sm:text-[32px] text-[22px] text-brand-primary mb-6">
        {t.abnormalParametersTitle}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 w-full">
        {abnormalCards.map((card) => (
          <AbnormalCard
            key={card.id}
            title={card.title}
            value={card.value}
            unit={card.unit}
            description={card.description}
            colorType={card.colorType}
          />
        ))}
      </div>
    </div>
  );
}
