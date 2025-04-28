import React from 'react';
import { MapPin, Plane } from 'lucide-react';

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
    return disasterType === 'floods' ? 'text-blue-500' : 'text-blue-500';
  };

  const getBackgroundColor = () => {
    return disasterType === 'floods' ? 'bg-blue-50' : 'bg-blue-50';
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
      className={`relative overflow-hidden rounded-lg ${className} ${getBackgroundColor()} shadow-inner transition-all duration-200 hover:opacity-90`}
      onClick={isStatic ? handleMapClick : undefined}
      role={isStatic ? "button" : undefined}
      tabIndex={isStatic ? 0 : undefined}
    >
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)"/>
        </svg>
      </div>

      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/3 w-1/3 h-1/4 rounded-full bg-white/20 blur-sm"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/5 h-1/5 rounded-full bg-white/20 blur-sm"></div>
        <div className="absolute top-1/2 left-1/2 w-1/4 h-1/5 rounded-lg bg-white/10 blur-sm"></div>
      </div>
      
      {!isStatic && (
        <div className="absolute inset-0 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <path
              id="rescuePath"
              d="M 20,80 C 35,70 40,55 60,40 S 70,25 85,15"
              fill="none"
              stroke="#4CAFFF"
              strokeWidth="1.2"
              strokeLinecap="round"
              className="opacity-80"
            />
            
            <g transform="translate(20,80)">
              <Plane className="w-0.5 h-0.5 text-resq-blue" />
            </g>
            
            <g transform="translate(85,15)">
              <MapPin className="w-0.5 h-0.5 text-resq-blue" />
            </g>
            
            <animateMotion
              dur="15s"
              repeatCount="indefinite"
              path="M 20,80 C 35,70 40,55 60,40 S 70,25 85,15"
              rotate="auto"
            >
              <g>
                <Plane className="w-0.5 h-0.5 text-resq-blue" />
              </g>
            </animateMotion>
          </svg>
        </div>
      )}
      
      <div className="absolute top-3 left-3 h-10 w-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center">
        <div className="h-8 w-8 relative">
          <div className="absolute h-1 w-4 bg-red-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
          <div className="absolute h-4 w-1 bg-gray-600 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-[10px] font-bold text-gray-700">N</div>
        </div>
      </div>
      
      <div className="absolute bottom-3 left-3 h-1.5 w-16 bg-white/90 shadow-md flex items-center justify-between px-1 rounded-full">
        <div className="h-3 w-0.5 bg-gray-600 rounded-full"></div>
        <div className="h-2 w-0.5 bg-gray-400 rounded-full"></div>
        <div className="h-2 w-0.5 bg-gray-400 rounded-full"></div>
        <div className="h-3 w-0.5 bg-gray-600 rounded-full"></div>
      </div>
    </div>
  );
};

export default GoogleMap;
