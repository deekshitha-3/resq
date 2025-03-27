
import { createClient } from '@supabase/supabase-js';

// Since this is a purely frontend app without a real backend yet,
// we're using Supabase in client-side mode with public keys only
export const supabase = createClient(
  'https://placeholder-supabase-url.supabase.co',
  'placeholder-supabase-public-key'
);

// Define the post type interface
export interface Post {
  id: string;
  disaster_type: string;
  message?: string;
  image_url?: string;
  created_at: string;
}
