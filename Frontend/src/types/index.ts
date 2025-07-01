export interface User {
  id: number;
  email: string;
  name: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface ClassificationResult {
  cls_name: string;
  is_pet: boolean;
}

export interface DetectionResult {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  conf: number;
  label: string;
}

export interface SegmentationResult {
  seg_mask: number[][];
}

export interface ApiError {
  detail: string;
}

export type AIModelType = 'classification' | 'detection' | 'segmentation';

export interface ProcessedImage {
  file: File;
  preview: string;
  classification?: ClassificationResult;
  detection?: DetectionResult[];
  segmentation?: SegmentationResult;
}