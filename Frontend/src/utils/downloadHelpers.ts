export const downloadCanvasAsImage = (canvasId: string, filename?: string) => {
  const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  if (!canvas) return;

  const link = document.createElement('a');
  link.download = filename || `${canvasId}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
};

export const downloadJSON = (data: any, filename: string) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.download = filename;
  link.href = URL.createObjectURL(blob);
  link.click();
};