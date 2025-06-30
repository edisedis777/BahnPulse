import React, { useState } from 'react';
import { ArrowRightLeft, Search } from 'lucide-react';
import { StationSearch } from './StationSearch';

interface SearchFormProps {
  onSearch: (fromId: string, toId: string, fromName: string, toName: string) => void;
  loading: boolean;
}

export function SearchForm({ onSearch, loading }: SearchFormProps) {
  const [fromId, setFromId] = useState('');
  const [toId, setToId] = useState('');
  const [fromName, setFromName] = useState('');
  const [toName, setToName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fromId && toId && fromId !== toId) {
      onSearch(fromId, toId, fromName, toName);
    }
  };

  const swapStations = () => {
    const tempId = fromId;
    const tempName = fromName;
    setFromId(toId);
    setFromName(toName);
    setToId(tempId);
    setToName(tempName);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 mb-6 sm:mb-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">
        Plan Your Journey
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <StationSearch
            value={fromId}
            onChange={(id, name) => {
              setFromId(id);
              setFromName(name);
            }}
            placeholder="Search departure station..."
            label="From"
            disabled={loading}
          />

          <StationSearch
            value={toId}
            onChange={(id, name) => {
              setToId(id);
              setToName(name);
            }}
            placeholder="Search destination station..."
            label="To"
            disabled={loading}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={swapStations}
            disabled={loading}
            className="p-2 sm:p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Swap stations"
            aria-label="Swap departure and destination stations"
          >
            <ArrowRightLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <button
          type="submit"
          disabled={!fromId || !toId || fromId === toId || loading}
          className="w-full bg-red-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-semibold 
                     hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed 
                     transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
          ) : (
            <>
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              Search Connections
            </>
          )}
        </button>
      </form>
    </div>
  );
}