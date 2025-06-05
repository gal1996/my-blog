import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  className = '' 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-600 ${sizeClasses[size]} ${className}`} />
  );
};

interface LoadingContainerProps {
  message?: string;
  children?: React.ReactNode;
}

export const LoadingContainer: React.FC<LoadingContainerProps> = ({ 
  message = 'Loading...', 
  children 
}) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
      <LoadingSpinner size="large" />
      {children || <p className="text-xl text-gray-700 mt-4">{message}</p>}
    </div>
  );
};