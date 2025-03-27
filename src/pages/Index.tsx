
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, X } from 'lucide-react';
import { toast } from 'sonner';
import Logo from '@/components/Logo';
import SOSButton from '@/components/SOSButton';
import EmergencyForm from '@/components/EmergencyForm';
import LocationMap from '@/components/LocationMap';
import { supabase } from '@/lib/supabase';

const Index = () => {
  const [disasterType, setDisasterType] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const [sosPressed, setSosPressed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSOS = async () => {
    if (!disasterType) {
      toast.error('Please select a disaster type first');
      return;
    }

    setLoading(true);
    
    try {
      // Upload image if provided
      let imageUrl = null;
      if (image) {
        const fileExt = image.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `posts/${fileName}`;
        
        // For demo purposes, we're simulating image upload
        imageUrl = `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/500/300`;
      }
      
      // Create a new post in Supabase
      const { error } = await supabase
        .from('posts')
        .insert([
          { 
            disaster_type: disasterType, 
            message: message || null, 
            image_url: imageUrl, 
            created_at: new Date().toISOString() 
          }
        ]);
      
      if (error) throw error;
      
      // Simulate location sharing and processing
      setTimeout(() => {
        setLoading(false);
        setSosPressed(true);
        toast.success('Location shared and incident posted successfully!');
      }, 1500);
    } catch (error) {
      console.error('Error saving post:', error);
      setLoading(false);
      // Still show location but inform about post failure
      setSosPressed(true);
      toast.error('Location shared, but failed to save incident post');
    }
  };

  const resetForm = () => {
    setSosPressed(false);
    setDisasterType('');
    setImage(null);
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-resq-light pb-20">
      <div className="container-responsive py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="w-10"></div> {/* Spacer for alignment */}
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

        {/* Main Content */}
        <div className="glass-card rounded-2xl p-6 shadow-md">
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
              <LocationMap disasterType={disasterType} />
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
      </div>
    </div>
  );
};

export default Index;
