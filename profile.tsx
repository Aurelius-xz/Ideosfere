'use client'

import React, { useState } from 'react';
import { 
  Camera, 
  Grid, 
  Settings, 
  MoreHorizontal, 
  Heart, 
  MessageCircle, 
  Repeat2, 
  Share,
  Plus 
} from 'lucide-react';


// Type definition for user profile data
interface ProfileData {
  username: string;
  fullName: string;
  bio: string;
  profilePicture: string;
  posts: number;
  followers: number;
  following: number;
}


// Type definition for individual post data
interface Post {
  id: number;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
}


// Type definition for story highlight data
interface StoryHighlight {
  id: number;
  image: string;
}


const InstagramProfile = () => {
  // State for following status
  const [isFollowing, setIsFollowing] = useState(false);
  
  // State for active navigation tab
  const [activeTab, setActiveTab] = useState('posts');
  
  // State for tracking liked posts
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  
  // State for story highlights
  const [highlights, setHighlights] = useState<StoryHighlight[]>([]);


  // Mock profile data
  const profile: ProfileData = {
    username: "PAUL",
    fullName: "PAUL-MONET ROSENBROCK",
    bio: "BIG RETARD",
    profilePicture: "/api/placeholder/150/150",
    posts: 200,
    followers: 2000,
    following: 20,
  };


  // Function to add a new story highlight
  const addHighlight = () => {
    const newHighlight: StoryHighlight = {
      id: highlights.length + 1,
      image: `/api/placeholder/150/150`,
    };
    setHighlights([...highlights, newHighlight]);
  };


  // Generate mock post data
  const posts: Post[] = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    image: `/api/placeholder/800/600`,
    caption: [
      "POST 1",
      "POST 2",
      "POST 3",
      "POST 4",
      "POST 5",
      "POST 6",
      "POST 7",
      "POST 8",
      "POST 9",
      "POST 10",
    ][i % 10],  // Cycle through 10 different captions
    likes: Math.floor(Math.random() * 1000) + 100,  // Random likes between 100-1100
    comments: Math.floor(Math.random() * 100) + 10,  // Random comments between 10-110
    timestamp: `${Math.floor(Math.random() * 23) + 1}h ago`  // Random hours ago
  }));


  // Function to handle follow/unfollow action
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };


  // Function to handle post likes
  const handleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)  // Unlike if already liked
        : [...prev, postId]  // Like if not already liked
    );
  };


  return (
    // Main container
    <div className="max-w-2xl mx-auto bg-white shadow-sm min-h-screen">
      
      {/* Fixed header section containing profile info and navigation */}
      <div className="sticky top-0 bg-white z-10">
        
        {/* Profile information section */}
        <div className="p-8 flex items-start gap-12 border-b border-gray-200">
          
          {/* Profile picture container */}
          <div className="w-20 h-20 rounded-full border-2 border-gray-400 p-2 shadow-sm">
            <img 
              src={profile.profilePicture} 
              alt={profile.username}
              className="w-full h-full rounded-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
            />
          </div>
          
          {/* Profile details container */}
          <div className="flex-1">
            {/* Username and action buttons */}
            <div className="flex items-center gap-8 mb-6">
              <h1 className="text-xl font-semibold text-gray-900">{profile.username}</h1>
              <button 
                onClick={handleFollow}
                className={`px-10 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                  isFollowing 
                    ? 'bg-gray-100 text-gray-900 hover:bg-gray-200' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
              <Settings className="w-6 h-6 text-gray-900 cursor-pointer hover:opacity-70 transition-opacity" />
              <MoreHorizontal className="w-6 h-6 text-gray-900 cursor-pointer hover:opacity-70 transition-opacity" />
            </div>
            
            {/* Profile statistics */}
            <div className="flex gap-11 mb-7">
              <div className="text-center cursor-pointer hover:opacity-70 transition-opacity">
                <span className="font-semibold text-gray-900">{profile.posts}</span>
                <p className="text-sm text-gray-900">posts</p>
              </div>
              <div className="text-center cursor-pointer hover:opacity-70 transition-opacity">
                <span className="font-semibold text-gray-900">{profile.followers + (isFollowing ? 1 : 0)}</span>
                <p className="text-sm text-gray-900">followers</p>
              </div>
              <div className="text-center cursor-pointer hover:opacity-70 transition-opacity">
                <span className="font-semibold text-gray-900">{profile.following}</span>
                <p className="text-sm text-gray-900">following</p>
              </div>
            </div>
            
            {/* Profile bio */}
            <div>
              <p className="font-semibold text-gray-900">{profile.fullName}</p>
              <p className="whitespace-pre-line text-gray-900">{profile.bio}</p>
            </div>
          </div>
        </div>

        {/* Story Highlights Section */}
        <div className="px-8 py-4 overflow-x-auto">
          <div className="flex gap-4 min-w-max">
            {/* Add New Highlight Button */}
            <button 
              onClick={addHighlight}
              className="w-16 h-16 rounded-full border-2 border-gray-400 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-6 h-6 text-gray-600" />
            </button>
            
            {/* Existing Highlights */}
            {highlights.map((highlight) => (
              <div 
                key={highlight.id}
                className="w-16 h-16 rounded-full border-2 border-gray-400 p-1 cursor-pointer hover:opacity-90 transition-opacity"
              >
                <img 
                  src={highlight.image}
                  alt={'Spiral'}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 bg-white">
          <div className="flex justify-center gap-12 p-3">
            {/* Posts Tab */}
            <button 
              onClick={() => setActiveTab('posts')}
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                activeTab === 'posts' ? 'text-blue-500' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Grid className="w-7 h-4" />
              POSTS
            </button>

            {/* Comments Tab */}
            <button 
              onClick={() => setActiveTab('comments')}
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                activeTab === 'comments' ? 'text-blue-500' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Camera className="w-7 h-4" />
              COMMENTS
            </button>

            {/* Saved Tab */}
            <button 
              onClick={() => setActiveTab('saved')}
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                activeTab === 'saved' ? 'text-blue-500' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Camera className="w-7 h-4" />
              SAVED
            </button>

            {/* Private Tab */}
            <button 
              onClick={() => setActiveTab('private')}
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                activeTab === 'private' ? 'text-blue-500' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Camera className="w-7 h-4" />
              PRIVATE
            </button>

            {/* Liked Tab */}
            <button 
              onClick={() => setActiveTab('liked')}
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                activeTab === 'liked' ? 'text-blue-500' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Camera className="w-7 h-4" />
              LIKED
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Post Feed */}
      <div className="divide-y divide-gray-200">
        {posts.map((post) => (
          <article key={post.id} className="p-4">
            {/* Post Header */}
            <div className="flex items-center gap-3 mb-3">
              <img 
                src={profile.profilePicture} 
                alt={profile.username}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900">{profile.username}</p>
                <p className="text-xs text-gray-500">{post.timestamp}</p>
              </div>
            </div>
            
            {/* Post Image */}
            <img 
              src={post.image} 
              alt="Post"
              className="w-full rounded-lg mb-3"
            />
            
            {/* Post Actions */}
            <div className="flex gap-6 mb-3">
              {/* Like Button */}
              <button 
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-1 ${
                  likedPosts.includes(post.id) ? 'text-red-500' : 'text-gray-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${
                  likedPosts.includes(post.id) ? 'fill-current' : ''
                }`} />
                <span className="text-sm">{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
              </button>

              {/* Comment Button */}
              <button className="flex items-center gap-1 text-gray-600">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">{post.comments}</span>
              </button>

              {/* Repost Button */}
              <button className="flex items-center gap-1 text-gray-600">
                <Repeat2 className="w-5 h-5" />
              </button>

              {/* Share Button */}
              <button className="flex items-center gap-1 text-gray-600">
                <Share className="w-5 h-5" />
              </button>
            </div>
            
            {/* Post Caption */}
            <p className="text-gray-900">
              <span className="font-semibold mr-2">{profile.username}</span>
              {post.caption}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
};


export default InstagramProfile;