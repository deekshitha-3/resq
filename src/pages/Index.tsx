
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, X, Rocket } from 'lucide-react';
import { toast } from 'sonner';
import Logo from '@/components/Logo';
import SOSButton from '@/components/SOSButton';
import EmergencyForm from '@/components/EmergencyForm';
import LocationMap from '@/components/LocationMap';
import { supabase, getRandomIndianLocation } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [disasterType, setDisasterType] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const [sosPressed, setSosPressed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const [currentCoordinates, setCurrentCoordinates] = useState<{latitude: number, longitude: number} | null>(null);

  const handleSOS = async () => {
    if (!disasterType) {
      toast.error('Please select a disaster type first');
      return;
    }

    setLoading(true);
    
    try {
      let imageUrl = null;
      if (image) {
        const fileExt = image.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;
        
        // Upload image to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('post_images')
          .upload(filePath, image);
        
        if (uploadError) {
          throw uploadError;
        }
        
        // Get the public URL for the uploaded image
        const { data: { publicUrl } } = supabase.storage
          .from('post_images')
          .getPublicUrl(filePath);
          
        imageUrl = publicUrl;
        console.log('Image uploaded successfully:', publicUrl);
      }
      
      // Get a random location and random coordinates in India
      const location = getRandomIndianLocation();
      
      // Generate random coordinates in India (approximate range)
      const latitude = 8.4 + Math.random() * 28; // India spans from ~8N to ~36N
      const longitude = 68.7 + Math.random() * 28; // India spans from ~68E to ~97E
      
      // Store location and coordinates
      setCurrentLocation(location);
      setCurrentCoordinates({ latitude, longitude });
      
      const { error } = await supabase
        .from('posts')
        .insert([
          { 
            disaster_type: disasterType, 
            message: message || null, 
            image_url: imageUrl, 
            location: location,
            coordinates: JSON.stringify({ latitude, longitude }),
            created_at: new Date().toISOString() 
          }
        ]);
      
      if (error) throw error;
      
      setTimeout(() => {
        setLoading(false);
        setSosPressed(true);
        toast.success('Location shared and incident posted successfully!');
      }, 1500);
    } catch (error) {
      console.error('Error saving post:', error);
      setLoading(false);
      toast.error('Failed to share location and post incident');
    }
  };

  const resetForm = () => {
    setSosPressed(false);
    setDisasterType('');
    setImage(null);
    setMessage('');
    setCurrentLocation('');
    setCurrentCoordinates(null);
  };

  return (
    <div className="min-h-screen bg-resq-light pb-20">
      <div className="container-responsive py-6">
        <div className="flex justify-between items-center mb-8">
          <div className="w-10"></div>
          <Logo />
          <Link 
            to="/posts" 
            className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-white shadow-sm text-resq-dark hover:bg-gray-50 transition-colors"
            aria-label="Posts"
          >
            <MessageSquare className="h-4 w-4" />
            <span className="font-semibold text-xs">POSTS</span>
          </Link>
        </div>

        <div className="glass-card rounded-2xl p-6 shadow-md mb-8">
          {sosPressed ? (
            <>
              <div className="flex justify-end mb-4">
                <button 
                  onClick={resetForm}
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <LocationMap 
                disasterType={disasterType} 
                location={currentLocation}
                latitude={currentCoordinates?.latitude}
                longitude={currentCoordinates?.longitude}
              />
            </>
          ) : (
            <>
              <EmergencyForm 
                onDisasterTypeChange={setDisasterType}
                onImageUpload={setImage}
                onMessageChange={setMessage}
              />
              <SOSButton onClick={handleSOS} isLoading={loading} />
            </>
          )}
        </div>

        <div className="flex justify-center">
          <Link to="/models">
            <Button 
              variant="default" 
              className="bg-resq-blue hover:bg-resq-blue/90 text-white rounded-full px-10 py-4 flex items-center gap-2 shadow-md text-xl"
            >
              <Rocket className="h-6 w-6" />
              <span>Explore Our AI Models</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
