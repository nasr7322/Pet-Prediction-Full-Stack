import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { validateImageFile } from '../../utils/validation';

interface ImageUploadProps {
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreview: string;
  onClear: () => void;
  content: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onFileSelect,
  imagePreview,
  onClear,
  content
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('border-cyan-500');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('border-cyan-500');
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('border-cyan-500');

    const file = e.dataTransfer.files[0];
    if (file) {
      // Validate file before processing
      const validation = await validateImageFile(file);
      if (validation.isValid) {
        onFileSelect({ target: { files: [file] } } as unknown as React.ChangeEvent<HTMLInputElement>);
      } else {
        alert(validation.message || 'Invalid file');
      }
    }
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file before processing
      const validation = await validateImageFile(file);
      if (validation.isValid) {
        onFileSelect(e);
      } else {
        alert(validation.message || 'Invalid file');
        // Clear the input
        e.target.value = '';
      }
    }
  };

  return (
    <div className="text-center">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/gif,image/webp,image/bmp"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {!imagePreview ? (
        <div
          className="border-2 border-dashed border-gray-600 rounded-xl p-12 cursor-pointer hover:border-cyan-500 transition-colors duration-300"
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">{content.title}</h3>
          <p className="text-gray-400 mb-4">{content.subtitle}</p>
          <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-200">
            {content.buttonText}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Selected"
              className="max-w-full max-h-96 rounded-lg shadow-2xl"
            />
            <button
              onClick={onClear}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};