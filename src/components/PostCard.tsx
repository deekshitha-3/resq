
import React, { useState } from 'react';
import { Post } from '@/lib/supabase';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import LocationMap from '@/components/LocationMap';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [showMap, setShowMap] = useState(false);
  
  // Format the disaster type for display
  const formatDisasterType = (type: string) => {
    switch (type) {
      case 'floods':
        return 'Floods 🌊';
      case 'wildfire':
        return 'Wildfire 🔥';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  // Get a relative time string (e.g. "3 hours ago")
  const getRelativeTime = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
      return 'recently';
    }
  };

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  // Function to determine if an image URL is valid and not a blob
  const getValidImageUrl = (url: string | null) => {
    if (!url) return null;
    
    // Check if it's a blob URL (which won't persist after page refresh)
    if (url.startsWith('blob:')) {
      console.log('Converting blob URL to placeholder for:', url);
      return '/placeholder.svg';
    }
    
    console.log('Using image URL:', url);
    return url;
  };

  return (
    <Card className="mb-4 overflow-hidden hover:shadow-md transition-shadow animate-fade-in">
      <CardContent className="p-0">
        {post.disaster_type && (
          <div className="px-4 pt-4 pb-2">
            <Badge variant={post.disaster_type === 'floods' ? 'default' : 'destructive'} className="mb-2">
              {formatDisasterType(post.disaster_type)}
            </Badge>
          </div>
        )}
        
        {post.image_url && (
          <div className="w-full h-48 overflow-hidden">
            <img 
              src={getValidImageUrl(post.image_url)} 
              alt={`${post.disaster_type} incident`} 
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error('Image failed to load:', post.image_url);
                (e.target as HTMLImageElement).src = '/placeholder.svg'; 
              }}
            />
          </div>
        )}
        
        {post.message && (
          <div className="px-4 pt-3">
            <p className="text-sm text-gray-700">{post.message}</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2 pb-4 px-4 flex flex-col items-start">
        <div className="flex items-center text-xs text-gray-500 mb-1 w-full">
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-0 h-auto text-xs flex items-center text-gray-500 hover:text-resq-blue"
            onClick={toggleMap}
          >
            <MapPin className="h-3 w-3 mr-1" />
            <span>{post.location}</span>
          </Button>
          <span className="ml-auto">{getRelativeTime(post.created_at)}</span>
        </div>
        
        {showMap && (
          <div className="w-full mt-3">
            <LocationMap disasterType={post.disaster_type} isPostPage={true} />
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-2 text-xs"
              onClick={toggleMap}
            >
              Close Map
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
