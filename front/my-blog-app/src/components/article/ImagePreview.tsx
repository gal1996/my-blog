import React from 'react';

interface ImagePreviewProps {
  imageUrl: string;
  alt?: string;
  className?: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ 
  imageUrl, 
  alt = 'プレビュー',
  className = ''
}) => {
  if (!imageUrl.trim()) {
    return null;
  }

  return (
    <div className={`mt-2 ${className}`}>
      <img
        src={imageUrl}
        alt={alt}
        className="max-w-xs max-h-48 object-cover rounded-md border border-gray-300"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
        }}
      />
    </div>
  );
};