
import React, { useEffect, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface LocationMapProps {
  disasterType: string;
  isPostPage?: boolean; // New prop to identify if this is being used on Posts page
}

const LocationMap: React.FC<LocationMapProps> = ({ disasterType, isPostPage = false }) => {
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [direction, setDirection] = useState('');
  const [distance, setDistance] = useState('');

  useEffect(() => {
    // Simulate getting coordinates
    const timer = setTimeout(() => {
      setCoordinates({ lat: 37.7749, lng: -122.4194 });
      setIsLoading(false);
      
      // Generate random direction and distance
      const directions = ['North', 'South', 'East', 'West', 'Northeast', 'Northwest', 'Southeast', 'Southwest'];
      const randomDirection = directions[Math.floor(Math.random() * directions.length)];
      const randomDistance = Math.floor(Math.random() * 1000) + 100; // 100-1100 meters
      
      setDirection(randomDirection);
      setDistance(`${randomDistance}m`);
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
          <>
            <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden mb-4">
              {/* Mock map for demonstration */}
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

            {!isPostPage && (
              <div className="bg-resq-blue/10 p-4 rounded-lg border border-resq-blue/20">
                <div className="flex items-center space-x-2">
                  <Navigation className="h-5 w-5 text-resq-blue" />
                  <span className="font-medium text-sm">Nearest shelter found!</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Our team will reach you in a few minutes.</p>
                <div className="mt-2 pt-2 border-t border-resq-blue/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Distance:</span>
                    <span className="font-medium">{distance}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-500">Direction:</span>
                    <span className="font-medium">{direction}</span>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
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

            {!isPostPage && (
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <div className="flex items-center space-x-2">
                  <Navigation className="h-5 w-5 text-orange-500" />
                  <span className="font-medium text-sm">Your live location is shared!</span>
                </div>
                <p className="text-sm font-medium text-orange-700 mt-2">
                  Move towards a safer place.
                </p>
                <p className="text-sm text-gray-600 mt-3">
                  Our team will reach you in a few minutes.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LocationMap;
