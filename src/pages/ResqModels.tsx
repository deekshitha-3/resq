
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowLeft, Brain, Droplet, Flame, Users } from 'lucide-react';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ResqModels = () => {
  return (
    <div className="min-h-screen bg-resq-light pb-20">
      <div className="container-responsive py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link 
            to="/" 
            className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-white shadow-sm text-resq-dark hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-semibold text-xs">BACK</span>
          </Link>
          <Logo />
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>

        {/* Main Content */}
        <div className="glass-card rounded-2xl p-6 shadow-md mb-8">
          <div className="flex flex-col items-center mb-8">
            <Brain className="h-12 w-12 text-resq-blue mb-2" />
            <h1 className="text-2xl font-bold text-center mb-1">ResQ AI Models</h1>
            <p className="text-gray-600 text-center">
              Disaster detection powered by machine learning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Flood Detection */}
            <Link to="/models/flood-detection">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                <div className="bg-sky-100 p-4 flex justify-center">
                  <Droplet className="h-12 w-12 text-sky-600" />
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold text-lg mb-2">Flood Detection</h3>
                  <p className="text-sm text-gray-600">
                    Satellite imagery analysis for flood mapping
                  </p>
                </CardContent>
              </Card>
            </Link>

            {/* Victim Detection */}
            <a 
              href="https://resq-model.streamlit.app/save_victims" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Card className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                <div className="bg-amber-100 p-4 flex justify-center">
                  <Users className="h-12 w-12 text-amber-600" />
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold text-lg mb-2">Victim Detection</h3>
                  <p className="text-sm text-gray-600">
                    AI-powered detection of people in disaster zones
                  </p>
                </CardContent>
              </Card>
            </a>

            {/* Wildfire Detection */}
            <Link to="/models/wildfire-detection">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                <div className="bg-red-100 p-4 flex justify-center">
                  <Flame className="h-12 w-12 text-red-600" />
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold text-lg mb-2">Wildfire Detection</h3>
                  <p className="text-sm text-gray-600">
                    Early detection of wildfires using satellite data
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
          
          <div className="text-center border-t pt-6">
            <p className="mb-4">
              Check out our trained model code on GitHub 👉{" "}
              <a
                href="https://github.com/deekshitha-3/resq-model"
                target="_blank"
                rel="noopener noreferrer"
                className="text-resq-blue hover:underline font-medium inline-flex items-center"
              >
                GitHub Repository
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResqModels;
