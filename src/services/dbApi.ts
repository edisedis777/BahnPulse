export interface DBStation {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface DBJourney {
  id: string;
  legs: DBLeg[];
  duration: number;
  transfers: number;
}

export interface DBLeg {
  origin: DBStation;
  destination: DBStation;
  departure: {
    scheduledTime: string;
    actualTime?: string;
    delay?: number;
    platform?: string;
  };
  arrival: {
    scheduledTime: string;
    actualTime?: string;
    delay?: number;
  };
  line: {
    name: string;
    product: string;
    productName: string;
  };
  cancelled?: boolean;
}

export interface DBApiResponse {
  journeys: DBJourney[];
}

// Station data with coordinates
const STATIONS: { [key: string]: DBStation } = {
  '8000105': {
    id: '8000105',
    name: 'Berlin Hauptbahnhof',
    location: { latitude: 52.5251, longitude: 13.3694 }
  },
  '8000261': {
    id: '8000261',
    name: 'München Hauptbahnhof',
    location: { latitude: 48.1402, longitude: 11.5581 }
  },
  '8000152': {
    id: '8000152',
    name: 'Frankfurt(Main)Hbf',
    location: { latitude: 50.1070, longitude: 8.6632 }
  },
  '8000207': {
    id: '8000207',
    name: 'Hamburg Hbf',
    location: { latitude: 53.5528, longitude: 10.0067 }
  },
  '8000191': {
    id: '8000191',
    name: 'Hannover Hbf',
    location: { latitude: 52.3759, longitude: 9.7410 }
  },
  '8000096': {
    id: '8000096',
    name: 'Stuttgart Hbf',
    location: { latitude: 48.7838, longitude: 9.1829 }
  },
  '8000085': {
    id: '8000085',
    name: 'Nürnberg Hbf',
    location: { latitude: 49.4458, longitude: 11.0831 }
  },
  '8000068': {
    id: '8000068',
    name: 'Dresden Hbf',
    location: { latitude: 51.0407, longitude: 13.7320 }
  },
  '8000244': {
    id: '8000244',
    name: 'Leipzig Hbf',
    location: { latitude: 51.3459, longitude: 12.3821 }
  },
  '8000080': {
    id: '8000080',
    name: 'Köln Hbf',
    location: { latitude: 50.9430, longitude: 6.9583 }
  }
};

// Train types and their typical speeds/durations
const TRAIN_TYPES = [
  { product: 'ice', productName: 'ICE', name: 'ICE', speed: 250 },
  { product: 'ic', productName: 'IC', name: 'IC', speed: 160 },
  { product: 'regional', productName: 'RE', name: 'RE', speed: 120 },
  { product: 'regional', productName: 'RB', name: 'RB', speed: 100 }
];

export class DBApiService {
  private generateRealisticJourneys(fromId: string, toId: string, when: Date = new Date()): DBJourney[] {
    const origin = STATIONS[fromId];
    const destination = STATIONS[toId];
    
    if (!origin || !destination) {
      console.error(`Station not found: ${fromId} or ${toId}`);
      return [];
    }

    // Calculate approximate distance (simplified)
    const distance = this.calculateDistance(origin.location, destination.location);
    
    const journeys: DBJourney[] = [];
    const baseTime = new Date(when);
    
    // Generate 6-8 realistic journeys over the next few hours
    for (let i = 0; i < 7; i++) {
      const departureTime = new Date(baseTime.getTime() + (i * 45 + Math.random() * 30) * 60000);
      
      // Choose train type based on distance and time
      const trainType = this.selectTrainType(distance, i);
      
      // Calculate journey duration based on distance and train type
      const baseDuration = (distance / trainType.speed) * 3600; // seconds
      const duration = Math.round(baseDuration + Math.random() * 1800); // Add some variation
      
      const arrivalTime = new Date(departureTime.getTime() + duration * 1000);
      
      // Generate realistic delays
      const departureDelay = Math.random() < 0.3 ? Math.floor(Math.random() * 15) : 0;
      const arrivalDelay = departureDelay + (Math.random() < 0.2 ? Math.floor(Math.random() * 5) : 0);
      
      // Determine if journey needs transfers
      const needsTransfer = distance > 400 && trainType.product === 'regional';
      const transfers = needsTransfer ? 1 : 0;
      
      const journey: DBJourney = {
        id: `journey-${i}-${fromId}-${toId}`,
        legs: this.generateLegs(origin, destination, departureTime, arrivalTime, trainType, departureDelay, arrivalDelay, transfers),
        duration,
        transfers
      };
      
      journeys.push(journey);
    }
    
    return journeys.sort((a, b) => 
      new Date(a.legs[0].departure.scheduledTime).getTime() - 
      new Date(b.legs[0].departure.scheduledTime).getTime()
    );
  }

  private calculateDistance(from: { latitude: number; longitude: number }, to: { latitude: number; longitude: number }): number {
    const R = 6371; // Earth's radius in km
    const dLat = (to.latitude - from.latitude) * Math.PI / 180;
    const dLon = (to.longitude - from.longitude) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(from.latitude * Math.PI / 180) * Math.cos(to.latitude * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private selectTrainType(distance: number, index: number) {
    if (distance > 300) {
      // Long distance: prefer ICE/IC
      return index < 3 ? TRAIN_TYPES[0] : TRAIN_TYPES[1];
    } else if (distance > 150) {
      // Medium distance: mix of IC and regional
      return index % 2 === 0 ? TRAIN_TYPES[1] : TRAIN_TYPES[2];
    } else {
      // Short distance: regional trains
      return index % 2 === 0 ? TRAIN_TYPES[2] : TRAIN_TYPES[3];
    }
  }

  private generateLegs(
    origin: DBStation, 
    destination: DBStation, 
    departureTime: Date, 
    arrivalTime: Date, 
    trainType: any, 
    departureDelay: number, 
    arrivalDelay: number,
    transfers: number
  ): DBLeg[] {
    const legs: DBLeg[] = [];
    
    if (transfers === 0) {
      // Direct connection
      const leg: DBLeg = {
        origin,
        destination,
        departure: {
          scheduledTime: departureTime.toISOString(),
          actualTime: new Date(departureTime.getTime() + departureDelay * 60000).toISOString(),
          delay: departureDelay,
          platform: `${Math.floor(Math.random() * 12) + 1}`
        },
        arrival: {
          scheduledTime: arrivalTime.toISOString(),
          actualTime: new Date(arrivalTime.getTime() + arrivalDelay * 60000).toISOString(),
          delay: arrivalDelay
        },
        line: {
          name: `${trainType.name} ${Math.floor(Math.random() * 900) + 100}`,
          product: trainType.product,
          productName: trainType.productName
        },
        cancelled: Math.random() < 0.02 // 2% chance of cancellation
      };
      legs.push(leg);
    } else {
      // Connection with transfer (simplified - just add an intermediate station)
      const intermediateStations = Object.values(STATIONS).filter(s => 
        s.id !== origin.id && s.id !== destination.id
      );
      const transferStation = intermediateStations[Math.floor(Math.random() * intermediateStations.length)];
      
      const transferTime = new Date(departureTime.getTime() + (arrivalTime.getTime() - departureTime.getTime()) * 0.6);
      const waitTime = 15 * 60000; // 15 minutes transfer time
      const secondDepartureTime = new Date(transferTime.getTime() + waitTime);
      
      // First leg
      legs.push({
        origin,
        destination: transferStation,
        departure: {
          scheduledTime: departureTime.toISOString(),
          actualTime: new Date(departureTime.getTime() + departureDelay * 60000).toISOString(),
          delay: departureDelay,
          platform: `${Math.floor(Math.random() * 12) + 1}`
        },
        arrival: {
          scheduledTime: transferTime.toISOString(),
          actualTime: new Date(transferTime.getTime() + departureDelay * 60000).toISOString(),
          delay: departureDelay
        },
        line: {
          name: `${trainType.name} ${Math.floor(Math.random() * 900) + 100}`,
          product: trainType.product,
          productName: trainType.productName
        },
        cancelled: false
      });
      
      // Second leg
      legs.push({
        origin: transferStation,
        destination,
        departure: {
          scheduledTime: secondDepartureTime.toISOString(),
          actualTime: new Date(secondDepartureTime.getTime() + Math.floor(Math.random() * 5) * 60000).toISOString(),
          delay: Math.floor(Math.random() * 5),
          platform: `${Math.floor(Math.random() * 12) + 1}`
        },
        arrival: {
          scheduledTime: arrivalTime.toISOString(),
          actualTime: new Date(arrivalTime.getTime() + arrivalDelay * 60000).toISOString(),
          delay: arrivalDelay
        },
        line: {
          name: `${TRAIN_TYPES[2].name} ${Math.floor(Math.random() * 900) + 100}`,
          product: TRAIN_TYPES[2].product,
          productName: TRAIN_TYPES[2].productName
        },
        cancelled: false
      });
    }
    
    return legs;
  }

  async searchStations(query: string): Promise<DBStation[]> {
    const normalizedQuery = query.toLowerCase();
    return Object.values(STATIONS).filter(station =>
      station.name.toLowerCase().includes(normalizedQuery)
    ).slice(0, 10);
  }

  async getJourneys(fromId: string, toId: string, when?: Date): Promise<DBJourney[]> {
    try {
      console.log(`Searching for journeys from ${fromId} to ${toId}`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
      
      const journeys = this.generateRealisticJourneys(fromId, toId, when);
      
      console.log(`Generated ${journeys.length} realistic journeys`);
      return journeys;
    } catch (error) {
      console.error('Error generating journeys:', error);
      return [];
    }
  }

  async getStationDepartures(stationId: string, when?: Date): Promise<any[]> {
    try {
      const station = STATIONS[stationId];
      if (!station) {
        return [];
      }

      // Generate realistic departures for the next 2 hours
      const departures = [];
      const baseTime = when || new Date();
      
      for (let i = 0; i < 20; i++) {
        const departureTime = new Date(baseTime.getTime() + (i * 8 + Math.random() * 7) * 60000);
        const trainType = TRAIN_TYPES[Math.floor(Math.random() * TRAIN_TYPES.length)];
        const delay = Math.random() < 0.3 ? Math.floor(Math.random() * 20) : 0;
        
        // Pick a random destination
        const destinations = Object.values(STATIONS).filter(s => s.id !== stationId);
        const destination = destinations[Math.floor(Math.random() * destinations.length)];
        
        departures.push({
          tripId: `trip-${i}-${stationId}`,
          line: {
            name: `${trainType.name} ${Math.floor(Math.random() * 900) + 100}`,
            product: trainType.product,
            productName: trainType.productName
          },
          direction: destination.name,
          when: new Date(departureTime.getTime() + delay * 60000).toISOString(),
          plannedWhen: departureTime.toISOString(),
          delay: delay,
          platform: `${Math.floor(Math.random() * 12) + 1}`,
          cancelled: Math.random() < 0.02,
          stop: {
            id: stationId,
            name: station.name
          }
        });
      }
      
      return departures.sort((a, b) => new Date(a.when).getTime() - new Date(b.when).getTime());
    } catch (error) {
      console.error('Error generating departures:', error);
      return [];
    }
  }
}

export const dbApi = new DBApiService();