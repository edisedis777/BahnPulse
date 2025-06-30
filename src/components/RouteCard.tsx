import React from 'react';
import { Clock, Users, ArrowRight } from 'lucide-react';
import { Route } from '../types/train';
import { TrainCard } from './TrainCard';

interface RouteCardProps {
  route: Route;
}

export function RouteCard({ route }: RouteCardProps) {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            <span className="font-semibold text-gray-900 text-sm sm:text-base">
              {formatDuration(route.totalDuration)}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            <span className="text-xs sm:text-sm text-gray-600">
              {route.transfers} transfer{route.transfers !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {route.totalDelay > 0 && (
          <div className="px-2 sm:px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs sm:text-sm font-medium self-start sm:self-auto">
            +{route.totalDelay} min delay
          </div>
        )}
      </div>

      <div className="space-y-3 sm:space-y-4">
        {route.trains.map((train, index) => (
          <div key={train.id}>
            <TrainCard 
              train={train} 
              isFirst={index === 0}
              isLast={index === route.trains.length - 1}
            />
            {index < route.trains.length - 1 && (
              <div className="flex items-center justify-center py-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Transfer</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}