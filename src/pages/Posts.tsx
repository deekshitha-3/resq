
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, FolderOpen, MessageSquare } from 'lucide-react';
import { supabase, Post } from '@/lib/supabase';
import PostCard from '@/components/PostCard';
import { ScrollArea } from '@/components/ui/scroll-area';

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        
        // Calculate date 20 days ago for auto-expiry filter
        const twentyDaysAgo = new Date();
        twentyDaysAgo.setDate(twentyDaysAgo.getDate() - 20);
        
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .gte('created_at', twentyDaysAgo.toISOString())
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        setPosts(data || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
        // For demo, show sample posts if fetch fails
        setPosts(getSamplePosts());
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
    
    // Set up subscription for real-time updates
    const subscription = supabase
      .channel('posts_channel')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'posts' 
      }, payload => {
        if (payload.eventType === 'INSERT') {
          setPosts(prev => [payload.new as Post, ...prev]);
        } else if (payload.eventType === 'DELETE') {
          setPosts(prev => prev.filter(post => post.id !== payload.old.id));
        }
      })
      .subscribe();
      
    // Clean up subscription
    return () => {
      supabase.channel('posts_channel').unsubscribe();
    };
  }, []);

  // Sample posts for demo purposes when Supabase isn't connected yet
  const getSamplePosts = (): Post[] => {
    return [
      {
        id: '1',
        disaster_type: 'floods',
        message: 'Water level rising rapidly near Riverside Drive. Need assistance with evacuation.',
        image_url: 'https://picsum.photos/seed/123/500/300',
        created_at: new Date(Date.now() - 3600000 * 2).toISOString() // 2 hours ago
      },
      {
        id: '2',
        disaster_type: 'wildfire',
        message: 'Heavy smoke in Pine Hills area. Moving towards evacuation point.',
        image_url: 'https://picsum.photos/seed/456/500/300',
        created_at: new Date(Date.now() - 3600000 * 24).toISOString() // 1 day ago
      },
      {
        id: '3',
        disaster_type: 'floods',
        image_url: 'https://picsum.photos/seed/789/500/300',
        created_at: new Date(Date.now() - 3600000 * 72).toISOString() // 3 days ago
      }
    ];
  };

  return (
    <div className="min-h-screen bg-resq-light">
      <div className="container-responsive py-6">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link 
            to="/" 
            className="flex items-center justify-center h-10 w-10 rounded-full bg-white shadow-sm text-resq-dark hover:bg-gray-50 transition-colors mr-4"
            aria-label="Back to home"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold text-center flex-1 mr-10 flex items-center justify-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            POSTS
          </h1>
        </div>

        {/* Posts Feed */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 rounded-full border-4 border-resq-blue border-t-transparent animate-spin"></div>
          </div>
        ) : posts.length > 0 ? (
          <ScrollArea className="h-[calc(100vh-140px)]">
            <div className="pr-4 animate-fade-in">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </ScrollArea>
        ) : (
          // Empty state
          <div className="glass-card rounded-2xl p-8 shadow-md flex flex-col items-center justify-center min-h-[300px] animate-fade-in">
            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <FolderOpen className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-lg font-medium text-gray-500">No posts yet!</p>
            <p className="text-sm text-gray-400 mt-2 text-center max-w-xs">
              Updates and important information will appear here during emergencies
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Posts;
