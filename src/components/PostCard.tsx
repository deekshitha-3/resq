
import React from 'react';
import { Post } from '@/lib/supabase';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
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
            />
          </div>
        )}
        
        {post.message && (
          <div className="px-4 pt-3">
            <p className="text-sm text-gray-700">{post.message}</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-2 pb-4 px-4">
        <p className="text-xs text-gray-500">{getRelativeTime(post.created_at)}</p>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
