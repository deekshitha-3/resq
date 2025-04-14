
import React, { useState } from 'react';
import { MapPin, AlertTriangle } from 'lucide-react';

interface GoogleMapProps {
  latitude?: number;
  longitude?: number;
  disasterType?: string;
  isStatic?: boolean;
  className?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  latitude = 13.1209289,
  longitude = 77.7337622,
  disasterType,
  isStatic = true,
  className = ''
}) => {
  // Using useState to track loading and error states
  const [loading, setLoading] = useState(false);
  const [mapError, setMapError] = useState(false);
  
  // For now, we'll use a fallback approach since the API key has issues
  // In production, this should be properly configured with a valid API key
  const apiKey = ""; // Intentionally left empty until proper configuration

  const getMapColor = () => {
    return disasterType === 'floods' ? 'text-blue-500' : 'text-red-500';
  };

  const handleMapClick = () => {
    window.open(`https://www.google.com/maps/@${latitude},${longitude},15z`, '_blank');
  };

  // Show fallback map representation since we're experiencing API issues
  const renderFallbackMap = () => {
    return (
      <div 
        className={`relative overflow-hidden rounded-lg ${className} bg-slate-100 flex flex-col items-center justify-center min-h-[200px]`}
        onClick={handleMapClick}
        role="button"
        tabIndex={0}
      >
        <MapPin className={`h-8 w-8 ${getMapColor()} mb-2`} />
        <div className="text-center px-4">
          <p className="text-sm text-gray-600 mb-1">
            {disasterType === 'floods' ? 'Flood' : 'Wildfire'} reported at:
          </p>
          <p className="font-medium text-gray-800">{latitude.toFixed(6)}, {longitude.toFixed(6)}</p>
          <p className="text-xs text-blue-600 mt-2 underline">Click to view on Google Maps</p>
        </div>
      </div>
    );
  };

  // Show loading state
  if (loading) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}>
        <div className="p-4 text-sm text-gray-500">Loading map...</div>
      </div>
    );
  }

  // If API key is not available or we've encountered an error, show the fallback
  if (!apiKey || mapError) {
    return renderFallbackMap();
  }

  if (isStatic) {
    // Static map image using Google Maps Static API
    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=600x300&markers=color:red%7C${latitude},${longitude}&key=${apiKey}`;
    
    return (
      <div 
        className={`relative overflow-hidden rounded-lg ${className}`}
        onClick={handleMapClick}
        role="button"
        tabIndex={0}
      >
        <img 
          src={mapUrl}
          alt="Location Map"
          className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer"
          onError={(e) => {
            console.error('Map image failed to load');
            setMapError(true); // Set error state to trigger fallback
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
        <div className={`absolute top-2 right-2 p-2 rounded-full bg-white shadow-md ${getMapColor()}`}>
          <MapPin className="h-4 w-4" />
        </div>
      </div>
    );
  }

  // Interactive embedded map
  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      {apiKey ? (
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${latitude},${longitude}&zoom=15`}
          onError={() => setMapError(true)}
        />
      ) : renderFallbackMap()}
      <div className={`absolute top-2 right-2 p-2 rounded-full bg-white shadow-md ${getMapColor()}`}>
        <MapPin className="h-4 w-4" />
      </div>
    </div>
  );
};

export default GoogleMap;
