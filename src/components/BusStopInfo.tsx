'use client';

interface BusStopInfoProps {
  busStopCode: string;
  isLoading: boolean;
  services: Array<{
    ServiceNo: string;
    Operator: string;
    NextBus: BusArrival;
    NextBus2: BusArrival;
    NextBus3: BusArrival;
  }>;
}

interface BusArrival {
  EstimatedArrival: string;
  Load: 'SEA' | 'SDA' | 'LSD';
  Type: 'SD' | 'DD' | 'BD';
  Feature: string;
  Monitored: string;
}

function getArrivalText(estimatedArrival: string): string {
  if (!estimatedArrival) return 'N/A';
  
  const arrivalTime = new Date(estimatedArrival);
  const now = new Date();
  const minutesAway = Math.floor((arrivalTime.getTime() - now.getTime()) / 60000);
  
  return minutesAway < 1 ? 'Arr' : `${minutesAway} min`;
}

function getBusTypeText(type: string): string {
  switch (type) {
    case 'SD': return 'Single Deck';
    case 'DD': return 'Double Deck';
    case 'BD': return 'Bendy';
    default: return type;
  }
}

function BusInfo({ bus, index }: { bus: BusArrival; index: number }) {
  if (!bus) return null;

  const arrivalText = getArrivalText(bus.EstimatedArrival);
  const loadClass = bus.Load === 'SEA' ? 'text-emerald-600' :
                    bus.Load === 'SDA' ? 'text-amber-600' :
                    bus.Load === 'LSD' ? 'text-rose-600' : '';

  return (
    <div className="flex items-center justify-between py-3 px-4 hover:bg-gray-100 rounded-lg transition-colors duration-200">
      <div className={`text-lg font-medium ${loadClass}`}>{arrivalText}</div>
      <div className="text-gray-700 flex items-center space-x-2">
        <span className="font-medium">{index === 0 ? 'Next Bus' : `${index + 1}nd Bus`}</span>
        {bus.Feature === 'WAB' && (
          <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs" title="Wheelchair Accessible">♿</span>
        )}
        {bus.Monitored === '0' && (
          <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs" title="Scheduled Arrival">🕰️</span>
        )}
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
          {getBusTypeText(bus.Type)}
        </span>
      </div>
    </div>
  );
}

export default function BusStopInfo({ busStopCode, isLoading, services }: BusStopInfoProps) {
  if (isLoading) {
    return (
      <div className="mt-6 p-6 bg-white rounded-xl shadow-lg transition-all duration-300 border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Bus Stop: {busStopCode}</h2>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-200 border-t-blue-600"></div>
        </div>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="mt-6 p-6 bg-white rounded-xl shadow-lg transition-all duration-300 border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Bus Stop: {busStopCode}</h2>
        <p className="text-center text-gray-600 py-8 text-lg">
          No bus services available for this bus stop.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 p-6 bg-white rounded-xl shadow-lg transition-all duration-300 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Bus Stop: {busStopCode}</h2>
      <div className="mb-6 p-4 bg-gray-50 rounded-lg text-sm">
        <div className="font-medium mb-2 text-gray-800">Bus Load Status:</div>
        <div className="space-y-1">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-emerald-700 mr-2"></span>
            <span className="text-emerald-900">Seats Available</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-amber-700 mr-2"></span>
            <span className="text-amber-900">Standing Available</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-rose-700 mr-2"></span>
            <span className="text-rose-900">Limited Standing</span>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service.ServiceNo}
            className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-200"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-bold text-blue-600">Bus {service.ServiceNo}</div>
              <div className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm">{service.Operator}</div>
            </div>
            
            <div className="space-y-2 divide-y divide-gray-100">
              <BusInfo bus={service.NextBus} index={0} />
              {service.NextBus2 && <BusInfo bus={service.NextBus2} index={1} />}
              {service.NextBus3 && <BusInfo bus={service.NextBus3} index={2} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}