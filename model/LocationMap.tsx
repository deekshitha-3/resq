import React from 'react';
import GoogleMap from './GoogleMap';
import { MapPin, Navigation2, Route } from 'lucide-react';

interface LocationMapProps {
  disasterType: string;
  isPostPage?: boolean;
}

const getRandomDistance = () => Math.floor(Math.random() * 150) + 50;
const getRandomDirection = () => {
  const directions = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
  return directions[Math.floor(Math.random() * directions.length)];
};

const getDirectionRotation = (direction: string): number => {
  const rotationMap: { [key: string]: number } = {
    'North': 0,
    'North-East': 45,
    'East': 90,
    'South-East': 135,
    'South': 180,
    'South-West': 225,
    'West': 270,
    'North-West': 315
  };
  return rotationMap[direction] || 0;
};

const LocationMap: React.FC<LocationMapProps> = ({ disasterType, isPostPage = false }) => {
  const distance = getRandomDistance();
  const direction = getRandomDirection();
  const rotation = getDirectionRotation(direction);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card rounded-xl p-6 shadow-lg">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-3">
            <MapPin className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-resq-dark">Your Live location shared</h2>
          {!isPostPage && (
            <p className="mt-2 text-lg font-medium text-resq-blue">
              Rescue team is approaching you
            </p>
          )}
        </div>

        <div className="relative w-full h-56 rounded-lg overflow-hidden">
          <GoogleMap 
            disasterType={disasterType}
            isStatic={isPostPage}
            className="h-56"
          />
        </div>

        {!isPostPage && (
          <div 
            className={`mt-6 p-5 rounded-lg border ${
              disasterType === 'floods' 
                ? 'bg-blue-50/80 border-blue-200' 
                : 'bg-orange-50/80 border-orange-200'
            }`}
          >
            <div className="flex flex-col space-y-4">
              <h3 className={`font-semibold text-lg ${
                disasterType === 'floods' 
                  ? 'text-resq-blue' 
                  : 'text-orange-700'
              }`}>
                {disasterType === 'floods' ? 'Nearest shelter found!' : 'Move to a safer location:'}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    disasterType === 'floods' ? 'bg-blue-100' : 'bg-orange-100'
                  }`}>
                    <Route className={`h-5 w-5 ${
                      disasterType === 'floods' ? 'text-resq-blue' : 'text-orange-600'
                    }`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Distance</p>
                    <p className="text-lg font-semibold">{distance}m</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    disasterType === 'floods' ? 'bg-blue-100' : 'bg-orange-100'
                  }`}>
                    <Navigation2 
                      className={`h-5 w-5 transform ${
                        disasterType === 'floods' ? 'text-resq-blue' : 'text-orange-600'
                      }`} 
                      style={{ transform: `rotate(${rotation}deg)` }}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Direction</p>
                    <p className="text-lg font-semibold">{direction}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationMap;
