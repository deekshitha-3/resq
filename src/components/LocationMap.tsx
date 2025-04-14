
import React from 'react';
import GoogleMap from './GoogleMap';

interface LocationMapProps {
  disasterType: string;
  isPostPage?: boolean;
}

const LocationMap: React.FC<LocationMapProps> = ({ disasterType, isPostPage = false }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-card rounded-lg p-4 shadow-md">
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-green-100 mb-2">
            <div className="h-5 w-5 text-green-600" />
          </div>
          <h2 className="text-lg font-semibold text-resq-dark">Your Live location shared</h2>
        </div>

        <div className="relative w-full h-48">
          <GoogleMap 
            disasterType={disasterType}
            isStatic={isPostPage}
            className="h-48"
          />
        </div>

        {!isPostPage && (
          <div className={`bg-${disasterType === 'floods' ? 'blue' : 'orange'}-50 p-4 rounded-lg border border-${disasterType === 'floods' ? 'blue' : 'orange'}-200 mt-4`}>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-sm">Our team will reach you in a few minutes.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationMap;
