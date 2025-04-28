
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Droplet } from 'lucide-react';
import Logo from '@/components/Logo';

const FloodDetection = () => {
  return (
    <div className="min-h-screen bg-resq-light pb-20">
      <div className="container-responsive py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link 
            to="/models" 
            className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-white shadow-sm text-resq-dark hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-semibold text-xs">BACK</span>
          </Link>
          <Logo />
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>

        {/* Main Content */}
        <div className="glass-card rounded-2xl p-6 shadow-md">
          <div className="flex flex-col items-center mb-8">
            <Droplet className="h-12 w-12 text-sky-600 mb-2" />
            <h1 className="text-2xl font-bold text-center mb-1">Floods Masking and Segmentation Model 🌊</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            <p className="text-lg font-medium mb-4 text-resq-blue">Accuracy of our model: 92%</p>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-md mb-6">
              <img 
                src="/flood_outcome.png" 
                alt="Flood Detection Model Results"
                className="w-full h-auto object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                  console.error('Failed to load flood_outcome.png - Please make sure to add this image to your public folder');
                }}
              />
            </div>

            <div className="space-y-2 mb-6">
              <p className="font-medium">
                <span className="text-blue-600">Original Mask</span> – actual flood area
              </p>
              <p className="font-medium">
                <span className="text-green-600">Predicted Mask</span> – model's prediction
              </p>
              <p className="font-medium">
                <span className="text-purple-600">Processed Mask</span> – refined version that closely matches the original
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">How our model detects floods using satellite imagery?</h2>
            <p className="text-gray-700">
              AI techniques are applied for data analysis and decision support, including semantic segmentation of satellite imagery, and optimization of resource allocation. 
              These algorithms provide actionable insights to emergency responders and relief agencies, aiding in strategic planning and response coordination.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloodDetection;
