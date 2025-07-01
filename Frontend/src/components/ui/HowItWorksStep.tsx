import React from 'react';

interface HowItWorksStepProps {
  step: string;
  title: string;
  desc: string;
  isLast?: boolean;
}

export const HowItWorksStep: React.FC<HowItWorksStepProps> = ({ 
  step, 
  title, 
  desc, 
  isLast = false 
}) => {
  return (
    <div className="relative">
      <div className="text-8xl font-bold text-cyan-500 mb-4 opacity-60">{step}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{desc}</p>
      {!isLast && (
        <div className="hidden md:block absolute top-12 -right-4 w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent"></div>
      )}
    </div>
  );
};