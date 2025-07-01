import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  examples: string[];
  gradient: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  examples,
  gradient
}) => {
  return (
    <div className="group relative bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-500 hover:transform-scale-105">
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl"
        style={{ backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))` }}></div>

      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-300 leading-relaxed mb-6">{description}</p>

      <div className="relative overflow-hidden rounded-lg">
        <img
          src={examples[0]}
          alt={`${title} example 1`}
          className="w-full h-64 object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        <img
          src={examples[1]}
          alt={`${title} example 2`}
          className="absolute inset-0 w-full h-64 object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

        <div className="absolute bottom-4 left-4 text-white text-sm font-medium">
          Example Output
        </div>
      </div>
    </div>
  );
};