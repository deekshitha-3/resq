
import { createClient } from '@supabase/supabase-js';
import { supabase as productionSupabase } from '@/integrations/supabase/client';

// Define the post type interface
export interface Post {
  id: string;
  disaster_type: string;
  message?: string;
  image_url?: string;
  location: string;
  created_at: string;
}

// Use the production Supabase client
export const supabase = productionSupabase;

// Function to generate random Indian locations
export const getRandomIndianLocation = (): string => {
  const indianLocations = [
    "Mumbai, Maharashtra",
    "Delhi, Delhi",
    "Bangalore, Karnataka",
    "Hyderabad, Telangana",
    "Chennai, Tamil Nadu",
    "Kolkata, West Bengal",
    "Pune, Maharashtra",
    "Ahmedabad, Gujarat",
    "Jaipur, Rajasthan",
    "Lucknow, Uttar Pradesh",
    "Kochi, Kerala",
    "Chandigarh, Punjab",
    "Bhopal, Madhya Pradesh",
    "Guwahati, Assam",
    "Varanasi, Uttar Pradesh",
    "Shimla, Himachal Pradesh",
    "Panaji, Goa",
    "Ranchi, Jharkhand",
    "Bhubaneswar, Odisha",
    "Dehradun, Uttarakhand"
  ];
  
  return indianLocations[Math.floor(Math.random() * indianLocations.length)];
};
