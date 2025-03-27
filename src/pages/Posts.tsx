
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, FolderOpen } from 'lucide-react';

const Posts = () => {
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
          <h1 className="text-xl font-bold text-center flex-1 mr-10">POSTS</h1>
        </div>

        {/* Empty state */}
        <div className="glass-card rounded-2xl p-8 shadow-md flex flex-col items-center justify-center min-h-[300px] animate-fade-in">
          <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <FolderOpen className="h-8 w-8 text-gray-400" />
          </div>
          <p className="text-lg font-medium text-gray-500">No posts yet!</p>
          <p className="text-sm text-gray-400 mt-2 text-center max-w-xs">
            Updates and important information will appear here during emergencies
          </p>
        </div>
      </div>
    </div>
  );
};

export default Posts;
