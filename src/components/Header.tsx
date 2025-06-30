import React from 'react';
import { Train, Activity, Info, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  onInfoClick?: () => void;
  showBackButton?: boolean;
}

export function Header({ onInfoClick, showBackButton = false }: HeaderProps) {
  return (
    <header className="bg-red-600 text-white py-4 sm:py-6 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-lg">
              <Train className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">BahnPulse</h1>
              <p className="text-red-100 text-xs sm:text-sm">Deutsche Bahn Journey Planner</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-red-100">
              <Activity className="w-5 h-5" />
              <span className="text-sm">Live Predictions</span>
            </div>
            
            {showBackButton ? (
              <button
                onClick={onInfoClick}
                className="flex items-center gap-2 px-3 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back</span>
              </button>
            ) : (
              <button
                onClick={onInfoClick}
                className="flex items-center gap-2 px-3 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
                aria-label="About this project"
              >
                <Info className="w-5 h-5" />
                <span className="hidden sm:inline">About</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}