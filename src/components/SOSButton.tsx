
import React from 'react';

interface SOSButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

const SOSButton: React.FC<SOSButtonProps> = ({ onClick, isLoading = false }) => {
  return (
    <div className="flex flex-col items-center mt-8 mb-4">
      <button
        onClick={onClick}
        disabled={isLoading}
        className="relative h-24 w-24 rounded-full bg-resq-red text-white font-bold text-2xl shadow-lg 
                   flex items-center justify-center 
                   transform transition-all duration-300 hover:scale-105 active:scale-95 
                   focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-opacity-50"
        aria-label="SOS Emergency Button"
      >
        {isLoading ? (
          <div className="h-10 w-10 rounded-full border-4 border-white border-t-transparent animate-spin"></div>
        ) : (
          <>
            <span className="z-10">SOS</span>
            <div className="absolute inset-0 rounded-full bg-resq-red animate-pulse-gentle"></div>
            <div className="absolute inset-0 rounded-full bg-resq-red opacity-30 animate-ripple"></div>
          </>
        )}
      </button>
      <p className="text-sm text-center text-gray-500 mt-4 max-w-xs">
        Pressing this button will share your live location
      </p>
    </div>
  );
};

export default SOSButton;
