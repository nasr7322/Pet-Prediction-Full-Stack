import { ArrowRight } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { websiteFeaturesContent } from '../content/pages/websiteFeatures';
import { FeatureCard } from '../components/ui/FeatureCard';
import { HowItWorksStep } from '../components/ui/HowItWorksStep';

export const WebsiteFeatures: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { hero, features, howItWorks } = websiteFeaturesContent;

  const handleTryAI = () => {
    if (user) {
      navigate('/ai-model');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
              {hero.title}
            </span>
          </h1>
          <p className="text-xl text-app-secondary max-w-2xl mx-auto leading-relaxed mb-8">
            {hero.subtitle}
          </p>

          {/* CTA Button */}
          <button
            onClick={handleTryAI}
            className="inline-flex items-center space-x-2 gradient-primary gradient-primary-hover text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg shadow-cyan-500/25"
          >
            <span>{user ? hero.ctaTextAuthenticated : hero.ctaText}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-20">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              examples={feature.examples}
              gradient={feature.gradient}
            />
          ))}
        </div>

        {/* How It Works */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-app-primary mb-12">{howItWorks.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.steps.map((step, index) => (
              <HowItWorksStep
                key={index}
                step={step.step}
                title={step.title}
                desc={step.desc}
                isLast={index === howItWorks.steps.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};