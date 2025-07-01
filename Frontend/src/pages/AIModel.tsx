import { AlertCircle } from 'lucide-react';
import React, { useState } from 'react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useAuth } from '../context/AuthContext';
import { predictionAPI } from '../services/predictionAPI';
import { ClassificationResult, DetectionResult, SegmentationResult } from '../types';
import { createImagePreview, validateImageFile } from '../utils/validation';
import { drawDetectionBoxes, renderSegmentationMask, renderCutout } from '../utils/imageProcessing';
import { downloadCanvasAsImage, downloadJSON } from '../utils/downloadHelpers';
import { aiModelContent } from '../content/pages/aiModel';
import { ImageUpload } from '../components/ui/ImageUpload';
import { ActionButtons } from '../components/ui/ActionButtons';

export const AIModel: React.FC = () => {
  const { token } = useAuth();
  const { hero, upload, buttons, results, processing, downloadButtons } = aiModelContent;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  // Results
  const [classificationResult, setClassificationResult] = useState<ClassificationResult | null>(null);
  const [detectionResult, setDetectionResult] = useState<DetectionResult[] | null>(null);
  const [segmentationResult, setSegmentationResult] = useState<SegmentationResult | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');

    // Validate file
    const validation = await validateImageFile(file);
    if (!validation.isValid) {
      setError(validation.message || 'Invalid file');
      return;
    }

    try {
      const preview = await createImagePreview(file);
      setSelectedFile(file);
      setImagePreview(preview);

      // Reset previous results
      setClassificationResult(null);
      setDetectionResult(null);
      setSegmentationResult(null);
    } catch (err) {
      setError('Failed to process image file');
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setImagePreview('');
    setClassificationResult(null);
    setDetectionResult(null);
    setSegmentationResult(null);
    setError('');
  };

  const handleClassify = async () => {
    if (!selectedFile || !token) return;

    setIsProcessing(true);
    setError('');

    try {
      const result = await predictionAPI.classify(selectedFile, token);
      setClassificationResult(result);
    } catch (err: any) {
      setError(err.message || 'Classification failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDetect = async () => {
    if (!selectedFile || !token) return;

    setIsProcessing(true);
    setError('');

    try {
      const result = await predictionAPI.detect(selectedFile, token);
      setDetectionResult(result);
    } catch (err: any) {
      setError(err.message || 'Detection failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSegment = async () => {
    if (!selectedFile || !token) return;

    setIsProcessing(true);
    setError('');

    try {
      const result = await predictionAPI.segment(selectedFile, token);
      setSegmentationResult(result);
    } catch (err: any) {
      setError(err.message || 'Segmentation failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
              {hero.title}
            </span>
          </h1>
          <p className="text-xl text-app-secondary max-w-3xl mx-auto">
            {hero.subtitle}
          </p>
        </div>

        {/* Upload Section */}
        <div className="mb-12">
          <div className="bg-app-glass backdrop-blur-sm rounded-2xl p-8 border border-app">
            <ImageUpload
              onFileSelect={handleFileSelect}
              imagePreview={imagePreview}
              onClear={handleClear}
              content={upload}
            />

            {imagePreview && (
              <div className="mt-6">
                <ActionButtons
                  onClassify={handleClassify}
                  onDetect={handleDetect}
                  onSegment={handleSegment}
                  isProcessing={isProcessing}
                  classificationResult={classificationResult}
                  content={buttons}
                />
              </div>
            )}
          </div>
        </div>

        {/* Loading State */}
        {isProcessing && (
          <div className="text-center mb-8">
            <LoadingSpinner size="lg" className="mx-auto mb-4" />
            <p className="text-app-secondary">{processing}</p>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-8">
            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <span className="text-red-300">{error}</span>
            </div>
          </div>
        )}

        {/* Results Section */}
        <div className="space-y-8">
          {/* Classification Results */}
          {classificationResult && (
            <div className="bg-app-glass backdrop-blur-sm rounded-2xl p-8 border border-app">
              <h2 className="text-2xl font-bold text-app-primary mb-6">{results.classification}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-app-glass rounded-lg p-6 border border-app">
                  <h3 className="text-lg font-semibold text-app-primary mb-2">Pet Detection</h3>
                  <span className={classificationResult.is_pet ? 'text-green-400' : 'text-red-400'}>
                    {classificationResult.is_pet ? 'Pet Detected' : 'No Pet Detected'}
                  </span>
                </div>
                <div className="bg-app-glass rounded-lg p-6 border border-app">
                  <h3 className="text-lg font-semibold text-app-primary mb-2">Classification</h3>
                  <p className="text-cyan-400 font-medium">{classificationResult.cls_name}</p>
                </div>
              </div>
            </div>
          )}

          {/* Detection Results */}
          {detectionResult && detectionResult.length > 0 && (
            <div className="bg-app-glass backdrop-blur-sm rounded-2xl p-8 border border-app">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-app-primary">{results.detection}</h2>
                <div className="flex gap-4">
                  <button
                    onClick={() => downloadCanvasAsImage('detectionCanvas')}
                    className="gradient-primary text-white px-4 py-2 rounded-lg"
                  >
                    {downloadButtons.image}
                  </button>
                  <button
                    onClick={() => downloadJSON(detectionResult, 'detection_results.json')}
                    className="gradient-primary text-white px-4 py-2 rounded-lg"
                  >
                    {downloadButtons.json}
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-app-primary mb-4">Detected Objects</h3>
                  <div className="space-y-3">
                    {detectionResult.map((detection, index) => (
                      <div key={index} className="bg-app-glass rounded-lg p-4 border border-app">
                        <div className="flex justify-between items-center">
                          <span className="text-app-primary font-medium">{detection.label}</span>
                          <span className="text-green-400 text-sm">
                            {(detection.conf * 100).toFixed(1)}% confidence
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-app-primary mb-4">Annotated Image</h3>
                  <canvas
                    id="detectionCanvas"
                    ref={(canvas) => {
                      if (canvas && detectionResult) {
                        drawDetectionBoxes(canvas, detectionResult, imagePreview);
                      }
                    }}
                    className="max-w-full rounded-lg border border-app"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Segmentation Results */}
          {segmentationResult && (
            <div className="bg-app-glass backdrop-blur-sm rounded-2xl p-8 border border-app">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-app-primary">{results.segmentation}</h2>
                <div className="flex gap-4">
                  <button
                    onClick={() => downloadCanvasAsImage('segmentationCanvas')}
                    className="gradient-primary text-white px-4 py-2 rounded-lg"
                  >
                    {downloadButtons.image}
                  </button>
                  <button
                    onClick={() => downloadJSON(segmentationResult, 'segmentation_results.json')}
                    className="gradient-primary text-white px-4 py-2 rounded-lg"
                  >
                    {downloadButtons.json}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-app-primary mb-4">Original Image</h3>
                  <img
                    src={imagePreview}
                    alt="Original"
                    className="w-full rounded-lg border border-app"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-app-primary mb-4">Segmentation Mask</h3>
                  <div className="relative group">
                    <canvas
                      id="segmentationCanvas"
                      ref={(canvas) => {
                        if (canvas && segmentationResult) {
                          renderCutout(canvas, imagePreview, segmentationResult.seg_mask);
                        }
                      }}
                      className="absolute inset-0 w-full h-full rounded-lg border border-app opacity-100 group-hover:opacity-0 transition-opacity duration-300"
                    />
                    <img
                      src={renderSegmentationMask(segmentationResult.seg_mask)}
                      alt="Segmentation Mask"
                      className="w-full rounded-lg border border-app"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};