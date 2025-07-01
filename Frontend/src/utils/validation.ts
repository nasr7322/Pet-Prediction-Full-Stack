export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; message?: string } => {
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long' };
  }
  return { isValid: true };
};

// Magic bytes for common image formats
const IMAGE_MAGIC_BYTES = {
  JPEG: [0xFF, 0xD8, 0xFF],
  PNG: [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A],
  GIF: [0x47, 0x49, 0x46],
  WEBP: [0x52, 0x49, 0x46, 0x46], // RIFF header for WEBP
  BMP: [0x42, 0x4D],
};

const checkMagicBytes = async (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      if (!e.target?.result) {
        resolve(false);
        return;
      }
      
      const arrayBuffer = e.target.result as ArrayBuffer;
      const uint8Array = new Uint8Array(arrayBuffer);
      
      // Check against known image magic bytes
      for (const [format, magicBytes] of Object.entries(IMAGE_MAGIC_BYTES)) {
        if (format === 'WEBP') {
          // WEBP has RIFF header followed by file size, then WEBP
          if (uint8Array.length >= 12 &&
              uint8Array[0] === 0x52 && uint8Array[1] === 0x49 && 
              uint8Array[2] === 0x46 && uint8Array[3] === 0x46 &&
              uint8Array[8] === 0x57 && uint8Array[9] === 0x45 && 
              uint8Array[10] === 0x42 && uint8Array[11] === 0x50) {
            resolve(true);
            return;
          }
        } else {
          // Check if file starts with the magic bytes
          if (uint8Array.length >= magicBytes.length) {
            const matches = magicBytes.every((byte, index) => uint8Array[index] === byte);
            if (matches) {
              resolve(true);
              return;
            }
          }
        }
      }
      
      resolve(false);
    };
    
    reader.onerror = () => resolve(false);
    
    // Read only the first 16 bytes for magic byte checking
    const blob = file.slice(0, 16);
    reader.readAsArrayBuffer(blob);
  });
};

export const validateImageFile = async (file: File): Promise<{ isValid: boolean; message?: string }> => {
  // Check file type extension
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/bmp'];
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, message: 'Only JPEG, PNG, GIF, WEBP, and BMP images are allowed' };
  }

  // Check file size (5MB limit)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    return { isValid: false, message: 'Image size must be less than 5MB' };
  }

  // Check magic bytes for additional security
  const hasMagicBytes = await checkMagicBytes(file);
  if (!hasMagicBytes) {
    return { isValid: false, message: 'File does not appear to be a valid image format' };
  }

  // Additional file name validation
  const fileName = file.name.toLowerCase();
  const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];
  const hasValidExtension = validExtensions.some(ext => fileName.endsWith(ext));
  
  if (!hasValidExtension) {
    return { isValid: false, message: 'File must have a valid image extension' };
  }

  return { isValid: true };
};

export const createImagePreview = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error('Failed to read file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};