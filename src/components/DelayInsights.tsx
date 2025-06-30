import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Clock, AlertCircle, Wifi, WifiOff } from 'lucide-react';

export function DelayInsights() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const insights = [
    {
      icon: isOnline ? <Wifi className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" /> : <WifiOff className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />,
      title: "Connection Status",
      value: isOnline ? "Online" : "Offline",
      trend: "neutral",
      description: isOnline ? "Real-time data available" : "Using cached data"
    },
    {
      icon: <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />,
      title: "Data Source",
      value: "Deutsche Bahn API",
      trend: "neutral",
      description: "Live train schedules and delays"
    },
    {
      icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />,
      title: "Coverage",
      value: "Germany-wide",
      trend: "up",
      description: "All major DB stations included"
    },
    {
      icon: <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />,
      title: "Update Frequency",
      value: "Real-time",
      trend: "neutral",
      description: "Data refreshed on each search"
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 mb-6 sm:mb-8">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Live Data Insights</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {insights.map((insight, index) => (
          <div key={index} className="p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-red-300 transition-colors">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              {insight.icon}
              <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">{insight.title}</h4>
            </div>
            <div className="text-base sm:text-lg font-bold text-gray-900 mb-1">{insight.value}</div>
            <p className="text-xs sm:text-sm text-gray-600">{insight.description}</p>
          </div>
        ))}
      </div>
      
      {!isOnline && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-yellow-800">
              You're currently offline. Some features may be limited until connection is restored.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}