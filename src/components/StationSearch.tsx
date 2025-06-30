import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';

interface Station {
  id: string;
  name: string;
  city: string;
}

const GERMAN_STATIONS: Station[] = [
  // Major cities
  { id: '8000105', name: 'Berlin Hauptbahnhof', city: 'Berlin' },
  { id: '8000261', name: 'München Hauptbahnhof', city: 'München' },
  { id: '8000152', name: 'Frankfurt(Main)Hbf', city: 'Frankfurt' },
  { id: '8000207', name: 'Hamburg Hbf', city: 'Hamburg' },
  { id: '8000191', name: 'Hannover Hbf', city: 'Hannover' },
  { id: '8000096', name: 'Stuttgart Hbf', city: 'Stuttgart' },
  { id: '8000085', name: 'Nürnberg Hbf', city: 'Nürnberg' },
  { id: '8000068', name: 'Dresden Hbf', city: 'Dresden' },
  { id: '8000244', name: 'Leipzig Hbf', city: 'Leipzig' },
  { id: '8000080', name: 'Köln Hbf', city: 'Köln' },
  { id: '8000098', name: 'Düsseldorf Hbf', city: 'Düsseldorf' },
  { id: '8000115', name: 'Essen Hbf', city: 'Essen' },
  { id: '8000169', name: 'Dortmund Hbf', city: 'Dortmund' },
  { id: '8000284', name: 'Bremen Hbf', city: 'Bremen' },
  
  // Berlin stations
  { id: '8010255', name: 'Berlin Ostbahnhof', city: 'Berlin' },
  { id: '8011160', name: 'Berlin Südkreuz', city: 'Berlin' },
  { id: '8010404', name: 'Berlin Gesundbrunnen', city: 'Berlin' },
  { id: '8013456', name: 'Berlin Potsdamer Platz', city: 'Berlin' },
  { id: '8089021', name: 'Berlin Brandenburg Airport', city: 'Berlin' },
  
  // Munich stations
  { id: '8000262', name: 'München Ost', city: 'München' },
  { id: '8004158', name: 'München Pasing', city: 'München' },
  { id: '8000346', name: 'München Flughafen', city: 'München' },
  
  // Frankfurt stations
  { id: '8000281', name: 'Frankfurt(Main)Süd', city: 'Frankfurt' },
  { id: '8070003', name: 'Frankfurt(M) Flughafen Fernbf', city: 'Frankfurt' },
  
  // Hamburg stations
  { id: '8002549', name: 'Hamburg-Altona', city: 'Hamburg' },
  { id: '8004960', name: 'Hamburg Dammtor', city: 'Hamburg' },
  { id: '8002553', name: 'Hamburg-Harburg', city: 'Hamburg' },
  
  // Other major cities
  { id: '8000001', name: 'Aachen Hbf', city: 'Aachen' },
  { id: '8000013', name: 'Augsburg Hbf', city: 'Augsburg' },
  { id: '8000025', name: 'Bamberg', city: 'Bamberg' },
  { id: '8000036', name: 'Bielefeld Hbf', city: 'Bielefeld' },
  { id: '8000049', name: 'Bochum Hbf', city: 'Bochum' },
  { id: '8000050', name: 'Bonn Hbf', city: 'Bonn' },
  { id: '8000056', name: 'Braunschweig Hbf', city: 'Braunschweig' },
  { id: '8000107', name: 'Karlsruhe Hbf', city: 'Karlsruhe' },
  { id: '8000128', name: 'Kiel Hbf', city: 'Kiel' },
  { id: '8000156', name: 'Freiburg(Breisgau) Hbf', city: 'Freiburg' },
  { id: '8000170', name: 'Göttingen', city: 'Göttingen' },
  { id: '8000183', name: 'Halle(Saale)Hbf', city: 'Halle' },
  { id: '8000206', name: 'Heidelberg Hbf', city: 'Heidelberg' },
  { id: '8000230', name: 'Kassel-Wilhelmshöhe', city: 'Kassel' },
  { id: '8000237', name: 'Koblenz Hbf', city: 'Koblenz' },
  { id: '8000252', name: 'Lübeck Hbf', city: 'Lübeck' },
  { id: '8000263', name: 'Magdeburg Hbf', city: 'Magdeburg' },
  { id: '8000266', name: 'Mainz Hbf', city: 'Mainz' },
  { id: '8000268', name: 'Mannheim Hbf', city: 'Mannheim' },
  { id: '8000286', name: 'Münster(Westf)Hbf', city: 'Münster' },
  { id: '8000294', name: 'Oldenburg(Oldb)Hbf', city: 'Oldenburg' },
  { id: '8000297', name: 'Osnabrück Hbf', city: 'Osnabrück' },
  { id: '8000299', name: 'Paderborn Hbf', city: 'Paderborn' },
  { id: '8000309', name: 'Regensburg Hbf', city: 'Regensburg' },
  { id: '8000320', name: 'Rostock Hbf', city: 'Rostock' },
  { id: '8000323', name: 'Saarbrücken Hbf', city: 'Saarbrücken' },
  { id: '8000342', name: 'Ulm Hbf', city: 'Ulm' },
  { id: '8000350', name: 'Wiesbaden Hbf', city: 'Wiesbaden' },
  { id: '8000368', name: 'Würzburg Hbf', city: 'Würzburg' }
];

interface StationSearchProps {
  value: string;
  onChange: (stationId: string, stationName: string) => void;
  placeholder: string;
  label: string;
  disabled?: boolean;
}

export function StationSearch({ value, onChange, placeholder, label, disabled = false }: StationSearchProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStationName, setSelectedStationName] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredStations = GERMAN_STATIONS.filter(station =>
    station.name.toLowerCase().includes(query.toLowerCase()) ||
    station.city.toLowerCase().includes(query.toLowerCase())
  );

  const handleStationSelect = (station: Station) => {
    setSelectedStationName(station.name);
    setQuery(station.name);
    setIsOpen(false);
    onChange(station.id, station.name);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setIsOpen(true);
    
    if (newQuery !== selectedStationName) {
      onChange('', '');
      setSelectedStationName('');
    }
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      inputRef.current?.focus();
    }
  };

  return (
    <div ref={searchRef} className="relative">
      <label htmlFor={`station-${label}`} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="w-4 h-4 text-gray-400" />
        </div>
        
        <input
          ref={inputRef}
          id={`station-${label}`}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full pl-10 pr-10 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-gray-900 text-sm sm:text-base disabled:bg-gray-100 disabled:cursor-not-allowed"
          autoComplete="off"
        />
        
        <button
          type="button"
          onClick={handleDropdownToggle}
          disabled={disabled}
          className="absolute inset-y-0 right-0 pr-3 flex items-center disabled:cursor-not-allowed"
          aria-label="Toggle station list"
        >
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredStations.length > 0 ? (
            filteredStations.map((station) => (
              <button
                key={station.id}
                onClick={() => handleStationSelect(station)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{station.name}</div>
                    <div className="text-xs text-gray-500">{station.city}</div>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500 text-sm text-center">
              No stations found matching "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}