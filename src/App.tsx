import React, { useState, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { SearchForm } from './components/SearchForm';
import { RouteCard } from './components/RouteCard';
import { DelayInsights } from './components/DelayInsights';
import { LoadingSpinner } from './components/LoadingSpinner';
import { dbApi } from './services/dbApi';
import { convertDBJourneyToRoute } from './utils/dbDataConverter';
import { Route } from './types/train';

// Lazy load the InfoPage component for better performance
const InfoPage = lazy(() => import('./components/InfoPage'));

function App() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<{ from: string; to: string } | null>(null);

  const handleSearch = async (fromId: string, toId: string, fromName: string, toName: string) => {
    setLoading(true);
    setHasSearched(true);
    setError(null);
    setSearchQuery({ from: fromName, to: toName });
    
    try {
      const journeys = await dbApi.getJourneys(fromId, toId);
      
      if (journeys.length === 0) {
        setRoutes([]);
        setError('No connections found for this route. Please try different stations or check back later.');
        return;
      }

      const convertedRoutes = journeys
        .map(journey => convertDBJourneyToRoute(journey))
        .filter(route => route.trains.length > 0); // Filter out invalid routes

      setRoutes(convertedRoutes);
    } catch (err) {
      console.error('Search error:', err);
      setError('Unable to fetch train data. Please check your internet connection and try again.');
      setRoutes([]);
    } finally {
      setLoading(false);
    }
  };

  if (showInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header onInfoClick={() => setShowInfo(false)} showBackButton />
        <Suspense fallback={<LoadingSpinner />}>
          <InfoPage />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header onInfoClick={() => setShowInfo(true)} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <DelayInsights />
        
        <SearchForm onSearch={handleSearch} loading={loading} />
        
        {loading && <LoadingSpinner />}
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5">⚠️</div>
              <div>
                <h3 className="font-semibold text-red-800 mb-1">Search Error</h3>
                <p className="text-red-700 text-sm">{error}</p>
                {searchQuery && (
                  <p className="text-red-600 text-xs mt-2">
                    Searched route: {searchQuery.from} → {searchQuery.to}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        
        {!loading && hasSearched && routes.length === 0 && !error && (
          <div className="text-center py-8 sm:py-12">
            <div className="text-gray-500 text-base sm:text-lg">No routes found for your search.</div>
            {searchQuery && (
              <div className="text-gray-400 text-sm mt-2">
                {searchQuery.from} → {searchQuery.to}
              </div>
            )}
          </div>
        )}
        
        {!loading && routes.length > 0 && (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Available Connections
              </h3>
              <div className="text-sm text-gray-600">
                {routes.length} option{routes.length !== 1 ? 's' : ''} found
                {searchQuery && (
                  <div className="text-xs text-gray-500 mt-1">
                    {searchQuery.from} → {searchQuery.to}
                  </div>
                )}
              </div>
            </div>
            
            {routes.map((route) => (
              <RouteCard key={route.id} route={route} />
            ))}
          </div>
        )}
        
        {!hasSearched && (
          <div className="text-center py-8 sm:py-16">
            <div className="max-w-md mx-auto">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
                <div className="text-gray-600 mb-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl sm:text-2xl">🚄</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    Welcome to BahnPulse
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Plan your journey with real-time Deutsche Bahn data. Search for any station in Germany to get live delay information and find the best connections.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <footer className="bg-gray-800 text-white py-6 sm:py-8 mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm sm:text-base">
              © 2025 BahnPulse. Real-time Deutsche Bahn journey planning.
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Data provided by Deutsche Bahn API. Use official DB services for ticket booking.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;