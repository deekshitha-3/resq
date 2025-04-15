
import React, { useState } from 'react';
import { Post } from '@/lib/supabase';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { MapPin, Droplet, Flame } from 'lucide-react';
import GoogleMap from './GoogleMap';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [showMap, setShowMap] = useState(false);
  
  const formatDisasterType = (type: string) => {
    switch (type) {
      case 'floods':
        return (
          <span className="flex items-center">
            Floods <Droplet className="h-4 w-4 ml-1 text-blue-500" />
          </span>
        );
      case 'wildfire':
        return (
          <span className="flex items-center">
            Wildfire <Flame className="h-4 w-4 ml-1 text-red-500" />
          </span>
        );
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

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
              src={post.image_url} 
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
            <GoogleMap 
              disasterType={post.disaster_type}
              isStatic={true}
              className="h-48 w-full mb-2"
              location={post.location}
            />
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
