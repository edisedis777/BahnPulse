import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-200"></div>
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent absolute top-0"></div>
      </div>
    </div>
  );
}