export interface Station {
  id: string;
  name: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Train {
  id: string;
  number: string;
  type: 'ICE' | 'IC' | 'RE' | 'RB' | 'S';
  from: Station;
  to: Station;
  departure: string;
  arrival: string;
  platform: string;
  delay: number;
  predictedDelay: number;
  status: 'on-time' | 'delayed' | 'cancelled';
  stops: Station[];
}

export interface Route {
  id: string;
  trains: Train[];
  totalDuration: number;
  totalDelay: number;
  transfers: number;
}