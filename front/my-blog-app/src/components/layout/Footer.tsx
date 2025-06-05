import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-6 text-center mt-12">
      <div className="container mx-auto px-4">
        <p className="text-sm">
          &copy; {currentYear} My Blog. All rights reserved.
        </p>
      </div>
    </footer>
  );
};