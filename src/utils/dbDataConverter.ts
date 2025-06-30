import { DBJourney, DBLeg } from '../services/dbApi';
import { Route, Train, Station } from '../types/train';

export function convertDBStationToStation(dbStation: any): Station {
  return {
    id: dbStation.id,
    name: dbStation.name,
    city: dbStation.name.split(' ')[0], // Extract city from station name
    coordinates: {
      lat: dbStation.location?.latitude || 0,
      lng: dbStation.location?.longitude || 0
    }
  };
}

export function convertDBJourneyToRoute(dbJourney: DBJourney): Route {
  const trains: Train[] = dbJourney.legs.map((leg, index) => {
    const train: Train = {
      id: `${dbJourney.id}-leg-${index}`,
      number: leg.line.name,
      type: mapProductToType(leg.line.product),
      from: convertDBStationToStation(leg.origin),
      to: convertDBStationToStation(leg.destination),
      departure: formatTime(leg.departure.scheduledTime),
      arrival: formatTime(leg.arrival.scheduledTime),
      platform: leg.departure.platform || 'TBA',
      delay: leg.departure.delay || 0,
      predictedDelay: leg.departure.delay || 0,
      status: leg.cancelled ? 'cancelled' : (leg.departure.delay && leg.departure.delay > 0 ? 'delayed' : 'on-time'),
      stops: [convertDBStationToStation(leg.origin), convertDBStationToStation(leg.destination)]
    };
    return train;
  });

  const totalDelay = Math.max(...trains.map(t => t.predictedDelay));
  
  return {
    id: dbJourney.id,
    trains,
    totalDuration: Math.floor(dbJourney.duration / 60), // Convert seconds to minutes
    totalDelay,
    transfers: dbJourney.transfers
  };
}

function mapProductToType(product: string): 'ICE' | 'IC' | 'RE' | 'RB' | 'S' {
  const productLower = product.toLowerCase();
  
  if (productLower.includes('ice')) return 'ICE';
  if (productLower.includes('ic') || productLower.includes('ec')) return 'IC';
  if (productLower.includes('re')) return 'RE';
  if (productLower.includes('rb')) return 'RB';
  if (productLower.includes('s')) return 'S';
  
  // Default fallback
  return 'RE';
}

function formatTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString('de-DE', { 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: 'Europe/Berlin'
    });
  } catch (error) {
    console.error('Error formatting time:', error);
    return '--:--';
  }
}

export function calculateDelayPrediction(scheduledTime: string, actualTime?: string): number {
  if (!actualTime) return 0;
  
  try {
    const scheduled = new Date(scheduledTime);
    const actual = new Date(actualTime);
    const delayMs = actual.getTime() - scheduled.getTime();
    return Math.max(0, Math.floor(delayMs / (1000 * 60))); // Convert to minutes
  } catch (error) {
    console.error('Error calculating delay:', error);
    return 0;
  }
}