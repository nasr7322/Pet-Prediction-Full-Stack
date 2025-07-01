import React from 'react';
import { Scan, Target, Scissors } from 'lucide-react';
import { ClassificationResult } from '../../types';
import { aiColors } from '../../config/aiColors';

interface ActionButtonsProps {
  onClassify: () => void;
  onDetect: () => void;
  onSegment: () => void;
  isProcessing: boolean;
  classificationResult: ClassificationResult | null;
  content: {
    classify: string;
    detect: string;
    segment: string;
  };
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onClassify,
  onDetect,
  onSegment,
  isProcessing,
  classificationResult,
  content
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <button
        onClick={onClassify}
        disabled={isProcessing}
        className={`flex items-center space-x-2 bg-gradient-to-r ${aiColors.buttons.classify} text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <Scan className="w-5 h-5" />
        <span>{content.classify}</span>
      </button>

      {classificationResult?.is_pet && (
        <>
          <button
            onClick={onDetect}
            disabled={isProcessing}
            className={`flex items-center space-x-2 bg-gradient-to-r ${aiColors.buttons.detect} text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Target className="w-5 h-5" />
            <span>{content.detect}</span>
          </button>

          <button
            onClick={onSegment}
            disabled={isProcessing}
            className={`flex items-center space-x-2 bg-gradient-to-r ${aiColors.buttons.segment} text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <Scissors className="w-5 h-5" />
            <span>{content.segment}</span>
          </button>
        </>
      )}
    </div>
  );
};