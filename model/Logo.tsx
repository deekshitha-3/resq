
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex flex-col items-center animate-fade-in">
      <div className="relative">
        <div className="h-16 w-16 rounded-full bg-resq-blue/20 flex items-center justify-center">
          <div className="h-12 w-12 rounded-full bg-resq-blue/30 flex items-center justify-center">
            <div className="h-8 w-8 rounded-full bg-resq-blue flex items-center justify-center">
              <span className="text-white font-bold text-2xl">R</span>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-resq-red flex items-center justify-center">
          <div className="h-3 w-3 rounded-full bg-white"></div>
        </div>
      </div>
      <h1 className="text-2xl font-bold text-resq-dark mt-2">
        Res<span className="text-resq-blue">Q</span>
      </h1>
    </div>
  );
};

export default Logo;
