import React from 'react';

interface StatCardProps {
  number: string;
  label: string;
}

export const StatCard: React.FC<StatCardProps> = ({ number, label }) => {
  return (
    <div>
      <div className="text-4xl font-bold text-cyan-400 mb-2">{number}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
};