import React from 'react';
import { MapPin } from 'lucide-react';

interface GoogleMapProps {
  latitude?: number;
  longitude?: number;
  disasterType?: string;
  isStatic?: boolean;
  className?: string;
  location?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  latitude = 13.1209289,
  longitude = 77.7337622,
  disasterType,
  isStatic = true,
  className = '',
  location
}) => {
  const getMapColor = () => {
    return disasterType === 'floods' ? 'text-blue-500' : 'text-red-500';
  };

  const getBackgroundColor = () => {
    return disasterType === 'floods' ? 'bg-blue-100' : 'bg-orange-100';
  };

  const handleMapClick = () => {
    if (location) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
    } else {
      window.open(`https://www.google.com/maps/@${latitude},${longitude},15z`, '_blank');
    }
  };

  return (
    <div 
      className={`relative overflow-hidden rounded-lg ${className} ${getBackgroundColor()} shadow-inner`}
      onClick={isStatic ? handleMapClick : undefined}
      role={isStatic ? "button" : undefined}
      tabIndex={isStatic ? 0 : undefined}
    >
      <div className="absolute inset-0 opacity-30">
        <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
          {Array(64).fill(0).map((_, i) => (
            <div key={i} className="border border-gray-300/20"></div>
          ))}
        </div>
        
        <div className="absolute top-1/4 left-1/3 w-1/3 h-1/4 rounded-full bg-white/20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/5 h-1/5 rounded-full bg-white/20"></div>
        <div className="absolute top-1/2 left-1/2 w-1/4 h-1/5 rounded bg-white/10"></div>
      </div>
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className={`p-2 rounded-full bg-white shadow-md ${getMapColor()}`}>
          <MapPin className="h-4 w-4" />
        </div>
        <div className="mt-1 px-2 py-1 bg-white/90 rounded-md shadow-sm text-xs">
          {location || "Current Location"}
        </div>
      </div>
      
      <div className="absolute top-2 left-2 h-8 w-8 rounded-full bg-white/80 shadow-sm flex items-center justify-center">
        <div className="h-6 w-6 relative">
          <div className="absolute h-1 w-3 bg-red-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
          <div className="absolute h-3 w-1 bg-gray-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-[8px] font-bold">N</div>
        </div>
      </div>
      
      <div className="absolute bottom-2 left-2 h-1 w-12 bg-white/80 shadow-sm flex items-center justify-between p-0.5 rounded-sm">
        <div className="h-2 w-0.5 bg-gray-500"></div>
        <div className="h-2 w-0.5 bg-gray-500"></div>
      </div>
    </div>
  );
};

export default GoogleMap;
