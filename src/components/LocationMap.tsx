
import React, { useEffect, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface LocationMapProps {
  disasterType: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ disasterType }) => {
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate getting coordinates
    const timer = setTimeout(() => {
      setCoordinates({ lat: 37.7749, lng: -122.4194 });
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
        <div className="text-gray-400">Getting your location...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card rounded-lg p-4 shadow-md">
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-green-100 mb-2">
            <MapPin className="h-5 w-5 text-green-600" />
          </div>
          <h2 className="text-lg font-semibold text-resq-dark">Your Live location shared</h2>
        </div>

        {disasterType === 'floods' ? (
          <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden mb-4">
            {/* Mock map for floods */}
            <div className="absolute inset-0 bg-[#4CAFFF]/20"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="h-6 w-6 rounded-full bg-resq-blue animate-pulse-gentle flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-white"></div>
              </div>
            </div>
            <div className="absolute bottom-4 right-4">
              <div className="h-6 w-6 rounded-full bg-green-500 animate-pulse-gentle flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-white flex items-center justify-center">
                  <Navigation className="h-3 w-3 text-green-500" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden mb-4">
            {/* Mock map with wildfire indicators */}
            <div className="absolute inset-0 bg-gradient-to-b from-orange-100 to-orange-50"></div>
            <div className="absolute top-1/3 right-1/3">
              <div className="h-8 w-8 rounded-full bg-orange-500/20"></div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="h-6 w-6 rounded-full bg-resq-blue animate-pulse-gentle flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-white"></div>
              </div>
            </div>
            <div className="absolute bottom-10 right-10">
              <div className="h-10 w-10 rounded-full bg-orange-500/30"></div>
            </div>
            <div className="absolute top-1/4 left-1/3">
              <div className="h-12 w-12 rounded-full bg-orange-500/30"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationMap;
