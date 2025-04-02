
import React from 'react';
import { ContentCard, Content } from '@/components/content/ContentCard';
import { useQuery } from '@tanstack/react-query';

// Mock function to fetch videos
const fetchVideos = async (): Promise<Content[]> => {
  // In a real app, this would be an API call
  return [
    {
      id: 'v1',
      title: 'Building a Full Stack App with Next.js',
      summary: 'A step-by-step tutorial on creating a full stack application using Next.js, Prisma, and PostgreSQL.',
      personId: 'p1',
      personName: 'Emma Johnson',
      personImage: 'https://i.pravatar.cc/150?u=emma',
      type: 'video',
      source: 'YouTube',
      publishedAt: new Date('2023-11-05'),
      url: 'https://youtube.com/watch?v=123',
      thumbnailUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7',
    },
    {
      id: 'v2',
      title: 'Advanced CSS Techniques',
      summary: 'Learn cutting-edge CSS techniques to create stunning user interfaces.',
      personId: 'p2',
      personName: 'Michael Chen',
      personImage: 'https://i.pravatar.cc/150?u=michael',
      type: 'video',
      source: 'YouTube',
      publishedAt: new Date('2023-10-12'),
      url: 'https://youtube.com/watch?v=456',
      thumbnailUrl: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890',
    },
    {
      id: 'v3',
      title: 'Optimizing React Performance',
      summary: 'Tips and tricks to make your React applications lightning fast.',
      personId: 'p3',
      personName: 'Sarah Williams',
      personImage: 'https://i.pravatar.cc/150?u=sarah',
      type: 'video',
      source: 'Vimeo',
      publishedAt: new Date('2023-09-18'),
      url: 'https://vimeo.com/789',
      thumbnailUrl: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2',
    }
  ];
};

const Videos = () => {
  const { data: videos = [], isLoading, error } = useQuery({
    queryKey: ['videos'],
    queryFn: fetchVideos
  });

  if (isLoading) {
    return <div className="p-8 text-center">Loading videos...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error loading videos</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <ContentCard key={video.id} content={video} />
        ))}
      </div>
    </div>
  );
};

export default Videos;
