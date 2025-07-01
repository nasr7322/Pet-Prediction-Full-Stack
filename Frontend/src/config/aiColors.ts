// AI Model Color Configuration
export const aiColors = {
  // Detection bounding box colors
  detection: {
    // HSL color generation for bounding boxes
    hueStep: 60, // Degrees between each color
    saturation: 70, // Saturation percentage
    lightness: 50, // Lightness percentage
    alpha: 0.2, // Alpha for fill
    strokeWidth: 3,
  },
  
  // Segmentation mask colors
  segmentation: {
    cat: {
      r: 255,
      g: 100, 
      b: 0,
      a: 150
    },
    dog: {
      r: 0,
      g: 255,
      b: 100,
      a: 150
    },
    background: {
      a: 0 // Transparent
    }
  },
  
  // Class IDs for segmentation
  classIds: {
    background: 0,
    cat: 8,
    dog: 12
  },
  
  // Button gradients
  buttons: {
    classify: 'from-cyan-500 to-blue-600',
    detect: 'from-green-500 to-teal-600', 
    segment: 'from-purple-500 to-pink-600'
  }
};