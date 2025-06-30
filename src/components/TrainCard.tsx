import React from 'react';
import { Clock, MapPin, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Train } from '../types/train';

interface TrainCardProps {
  train: Train;
  isFirst?: boolean;
  isLast?: boolean;
}

export function TrainCard({ train, isFirst = false, isLast = false }: TrainCardProps) {
  const getStatusIcon = () => {
    switch (train.status) {
      case 'on-time':
        return <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />;
      case 'delayed':
        return <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    if (train.status === 'cancelled') return 'Cancelled';
    if (train.predictedDelay > 0) return `+${train.predictedDelay} min`;
    return 'On time';
  };

  const getTypeColor = () => {
    switch (train.type) {
      case 'ICE':
        return 'bg-red-100 text-red-800';
      case 'IC':
        return 'bg-blue-100 text-blue-800';
      case 'RE':
        return 'bg-green-100 text-green-800';
      case 'RB':
        return 'bg-purple-100 text-purple-800';
      case 'S':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${getTypeColor()}`}>
            {train.type}
          </span>
          <span className="font-bold text-gray-900 text-sm sm:text-base">{train.number}</span>
        </div>
        
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className={`text-xs sm:text-sm font-medium ${
            train.predictedDelay > 0 ? 'text-red-600' : 'text-green-600'
          }`}>
            {getStatusText()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
            <span className="text-xs sm:text-sm text-gray-600">
              {isFirst ? 'Departure' : 'Transfer'}
            </span>
          </div>
          <div className="font-semibold text-gray-900 text-sm sm:text-base mb-1">{train.from.name}</div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1 sm:gap-2">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
              <span className="text-base sm:text-lg font-bold text-gray-900">{train.departure}</span>
            </div>
            <span className="text-xs sm:text-sm text-gray-600">Platform {train.platform}</span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
            <span className="text-xs sm:text-sm text-gray-600">
              {isLast ? 'Arrival' : 'Transfer'}
            </span>
          </div>
          <div className="font-semibold text-gray-900 text-sm sm:text-base mb-1">{train.to.name}</div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
            <span className="text-base sm:text-lg font-bold text-gray-900">{train.arrival}</span>
          </div>
        </div>
      </div>

      {train.predictedDelay > 5 && (
        <div className="mt-3 sm:mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-yellow-800">
              Delay prediction: {train.predictedDelay} minutes based on current traffic
            </span>
          </div>
        </div>
      )}
    </div>
  );
}