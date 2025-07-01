import { aiColors } from '../config/aiColors';
import { DetectionResult } from '../types';

export const drawDetectionBoxes = (
  canvas: HTMLCanvasElement, 
  detections: DetectionResult[], 
  imageSrc: string
) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Clear previous drawings
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the image first
  const img = new Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    // Draw bounding boxes
    detections.forEach((detection, index) => {
      const { x1, y1, x2, y2, label, conf } = detection;
      const { hueStep, saturation, lightness, alpha, strokeWidth } = aiColors.detection;

      // Box styling
      const hue = (index * hueStep) % 360;
      ctx.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      ctx.lineWidth = strokeWidth;
      ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;

      // Draw box
      const width = x2 - x1;
      const height = y2 - y1;
      ctx.fillRect(x1, y1, width, height);
      ctx.strokeRect(x1, y1, width, height);

      // Label background
      const labelText = `${label} (${(conf * 100).toFixed(1)}%)`;
      ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      ctx.fillRect(x1, y1 - 25, ctx.measureText(labelText).width + 10, 25);
      ctx.fillStyle = 'white';
      ctx.font = '14px Arial';
      ctx.fillText(labelText, x1 + 5, y1 - 8);
    });
  };
  img.src = imageSrc;
};

export const renderSegmentationMask = (mask: number[][]): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const height = mask.length;
  const width = mask[0]?.length || 0;

  canvas.width = width;
  canvas.height = height;

  const imageData = ctx.createImageData(width, height);
  const { cat, dog, background } = aiColors.segmentation;
  const { classIds } = aiColors;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const classId = mask[y][x];

      if (classId === classIds.cat) {
        imageData.data[idx] = cat.r;
        imageData.data[idx + 1] = cat.g;
        imageData.data[idx + 2] = cat.b;
        imageData.data[idx + 3] = cat.a;
      } else if (classId === classIds.dog) {
        imageData.data[idx] = dog.r;
        imageData.data[idx + 1] = dog.g;
        imageData.data[idx + 2] = dog.b;
        imageData.data[idx + 3] = dog.a;
      } else {
        imageData.data[idx + 3] = background.a;
      }
    }
  }

  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL();
};

export const renderCutout = (
  canvas: HTMLCanvasElement, 
  imageSrc: string, 
  mask: number[][]
) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const height = mask.length;
  const width = mask[0]?.length || 0;

  canvas.width = width;
  canvas.height = height;

  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, 0, 0, width, height);

    const imageData = ctx.getImageData(0, 0, width, height);
    const { classIds } = aiColors;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const classId = mask[y][x];

        if (classId !== classIds.cat && classId !== classIds.dog) {
          imageData.data[idx + 3] = 0;
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
  };
  img.src = imageSrc;
};