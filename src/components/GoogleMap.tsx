import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

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
  // Store the API key in a variable - in a real production app, this should be 
  // stored more securely, but for now we'll keep it simple
  const [loading] = useState(false);
  const apiKey = "AIzaSyAoGYnNgotSn4YiFylwei1Q05O1ywVUqBY";

  const getMapColor = () => {
    return disasterType === 'floods' ? 'text-blue-500' : 'text-red-500';
  };

  const handleMapClick = () => {
    window.open(`https://www.google.com/maps/@${latitude},${longitude},15z`, '_blank');
  };

  // Show loading state
  if (loading) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 rounded-lg ${className}`}>
        <div className="p-4 text-sm text-gray-500">Loading map...</div>
      </div>
    );
  }

  // If no API key is available, show placeholder
  if (!apiKey) {
    return (
      <div className={`relative overflow-hidden rounded-lg ${className} bg-gray-100 flex items-center justify-center`}>
        <div className="p-4 text-center">
          <MapPin className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-500">Map unavailable</p>
        </div>
      </div>
    );
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
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${latitude},${longitude}&zoom=15`}
      />
      <div className={`absolute top-2 right-2 p-2 rounded-full bg-white shadow-md ${getMapColor()}`}>
        <MapPin className="h-4 w-4" />
      </div>
    </div>
  );
};

export default GoogleMap;
