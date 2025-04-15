
import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

interface GoogleMapProps {
  latitude?: number;
  longitude?: number;
  location?: string;
  disasterType?: string;
  isStatic?: boolean;
  className?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  latitude,
  longitude,
  location,
  disasterType,
  isStatic = true,
  className = ''
}) => {
  // Using useState to track loading and error states
  const [loading, setLoading] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  
  // Using the Google Maps API key
  const apiKey = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with your actual API key
  
  // Validate API key on component mount
  useEffect(() => {
    if (!apiKey || apiKey === "YOUR_GOOGLE_MAPS_API_KEY") {
      setMapError("No Google Maps API key provided");
    } else if (!latitude || !longitude) {
      setMapError("No coordinates provided");
    }
  }, [apiKey, latitude, longitude]);

  const getMapColor = () => {
    return disasterType === 'floods' ? 'text-blue-500' : 'text-red-500';
  };

  const handleMapClick = () => {
    if (latitude && longitude) {
      window.open(`https://www.google.com/maps/@${latitude},${longitude},15z`, '_blank');
    }
  };

  // Show fallback map representation
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
          <p className="font-medium text-gray-800">{location || 'Unknown location'}</p>
          {latitude && longitude && (
            <p className="text-xs text-gray-500 mt-1">
              Coordinates: {latitude.toFixed(6)}, {longitude.toFixed(6)}
            </p>
          )}
          {latitude && longitude && (
            <p className="text-xs text-blue-600 mt-2 underline">Click to view on Google Maps</p>
          )}
          {mapError && (
            <p className="text-xs text-red-500 mt-2">{mapError}</p>
          )}
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
  if (!apiKey || apiKey === "YOUR_GOOGLE_MAPS_API_KEY" || mapError || !latitude || !longitude) {
    return renderFallbackMap();
  }

  if (isStatic) {
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
          alt={`Map of ${location || 'location'}`}
          className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer"
          onError={(e) => {
            console.error('Map image failed to load');
            setMapError("Failed to load Google Maps. This API project might not be authorized to use this API.");
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        {mapError && (
          <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center p-4">
            <MapPin className={`h-8 w-8 ${getMapColor()} mb-2`} />
            <p className="text-sm text-red-500 text-center">{mapError}</p>
            <p className="text-xs text-gray-600 mt-2 text-center">{location || 'Unknown location'}</p>
            {latitude && longitude && (
              <p className="text-xs text-gray-500 mt-1 text-center">
                Coordinates: {latitude.toFixed(6)}, {longitude.toFixed(6)}
              </p>
            )}
          </div>
        )}
        <div className={`absolute top-2 right-2 p-2 rounded-full bg-white shadow-md ${getMapColor()}`}>
          <MapPin className="h-4 w-4" />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${latitude},${longitude}&zoom=15`}
        onError={() => setMapError("Failed to load Google Maps. This API project might not be authorized to use this API.")}
      />
      {mapError && (
        <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center p-4">
          <MapPin className={`h-8 w-8 ${getMapColor()} mb-2`} />
          <p className="text-sm text-red-500 text-center">{mapError}</p>
          <p className="text-xs text-gray-600 mt-2 text-center">{location || 'Unknown location'}</p>
          {latitude && longitude && (
            <p className="text-xs text-gray-500 mt-1 text-center">
              Coordinates: {latitude.toFixed(6)}, {longitude.toFixed(6)}
            </p>
          )}
        </div>
      )}
      <div className={`absolute top-2 right-2 p-2 rounded-full bg-white shadow-md ${getMapColor()}`}>
        <MapPin className="h-4 w-4" />
      </div>
    </div>
  );
};

export default GoogleMap;
