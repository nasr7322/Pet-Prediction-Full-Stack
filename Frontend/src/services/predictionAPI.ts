import { ClassificationResult, DetectionResult, SegmentationResult } from '../types';
import { BASE_URL, handleResponse } from './api';

export const predictionAPI = {
  classify: async (image: File, token: string): Promise<ClassificationResult> => {
    const formData = new FormData();
    formData.append('file', image);

    const response = await fetch(`${BASE_URL}/predict/classification`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    return handleResponse(response);
  },

  detect: async (image: File, token: string): Promise<DetectionResult[]> => {
    const formData = new FormData();
    formData.append('file', image);

    const response = await fetch(`${BASE_URL}/predict/detection`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    return handleResponse(response);
  },

  segment: async (image: File, token: string): Promise<SegmentationResult> => {
    const formData = new FormData();
    formData.append('file', image);

    const response = await fetch(`${BASE_URL}/predict/segmentation`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    return handleResponse(response);
  },
};