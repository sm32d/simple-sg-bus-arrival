'use client';

import { useState } from 'react';
import SearchInput from '@/components/SearchInput';
import BusStopInfo from '@/components/BusStopInfo';
import FavoriteStops from '@/components/FavoriteStops';

interface BusArrival {
  EstimatedArrival: string;
  Load: 'SEA' | 'SDA' | 'LSD';
  Type: 'SD' | 'DD' | 'BD';
  Feature: string;
  Monitored: string;
}

interface BusService {
  ServiceNo: string;
  Operator: string;
  NextBus: BusArrival;
  NextBus2: BusArrival;
  NextBus3: BusArrival;
}

export default function Home() {
  const [busStopCode, setBusStopCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [busServices, setBusServices] = useState<BusService[]>([]);
  const [error, setError] = useState<string>('');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchBusArrival = async (stopNumber: string) => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(`/api/bus-arrival?BusStopCode=${stopNumber}`);

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      setBusServices(data.Services || []);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch bus arrival information');
      setBusServices([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (stopNumber: string) => {
    if (!stopNumber || !/^\d+$/.test(stopNumber)) {
      setError('Please enter a valid bus stop number');
      return;
    }
    setBusStopCode(stopNumber);
    fetchBusArrival(stopNumber);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-lg mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        🚌 SG Bus Arrival Info
        </h1>
        
        <SearchInput onSearch={handleSearch} />
        
        <FavoriteStops onSelectStop={handleSearch} />
        
        {lastUpdated && (
          <div className="mt-2 text-sm text-gray-600 text-center">
            Last updated at {lastUpdated.toLocaleTimeString()}
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {busStopCode && (
          <BusStopInfo
            busStopCode={busStopCode}
            isLoading={isLoading}
            services={busServices}
          />
        )}
        <footer className="mt-12 text-center text-sm text-gray-600">
          <p>Made with ❤️ in 🇸🇬 by <a href="https://bento.me/sm32d" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">dominik</a></p>
          <a 
            href="https://github.com/sm32d/simple-sg-bus-arrival" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            GitHub Repository
          </a>
          <p>v1.0.1</p>
        </footer>
      </div>
    </main>
  );
}
