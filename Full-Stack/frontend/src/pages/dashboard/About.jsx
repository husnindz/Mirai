import React from 'react';
import AboutHeader from './about/AboutHeader';
import AboutFeatures from './about/AboutFeatures';
import AboutParameters from './about/AboutParameters';
import AboutDisclaimer from './about/AboutDisclaimer';

export default function About() {
  return (
    <div className="w-full text-left animate-fade-in select-none">
      <AboutHeader />
      <AboutFeatures />
      <AboutParameters />
      <AboutDisclaimer />
    </div>
  );
}
