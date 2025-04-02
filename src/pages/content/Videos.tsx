
import React from 'react';
import { ContentCard, Content } from '@/components/content/ContentCard';
import { useQuery } from '@tanstack/react-query';
import { mockContent } from '@/utils/mockData';

// Function to fetch videos from mock data
const fetchVideos = async (): Promise<Content[]> => {
  // In a real app, this would be an API call
  // For now, filter videos from the main mockContent array
  return mockContent
    .filter(content => content.type === 'video')
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
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
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <ContentCard key={video.id} content={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No videos found.</p>
        </div>
      )}
    </div>
  );
};

export default Videos;
