
import React from 'react';
import { ContentCard, Content } from '@/components/content/ContentCard';
import { useQuery } from '@tanstack/react-query';
import { mockContent } from '@/utils/mockData';

// Function to fetch podcasts from mock data
const fetchPodcasts = async (): Promise<Content[]> => {
  // In a real app, this would be an API call
  // For now, filter podcasts from the main mockContent array
  return mockContent
    .filter(content => content.type === 'podcast')
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
};

const Podcasts = () => {
  const { data: podcasts = [], isLoading, error } = useQuery({
    queryKey: ['podcasts'],
    queryFn: fetchPodcasts
  });

  if (isLoading) {
    return <div className="p-8 text-center">Loading podcasts...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error loading podcasts</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Podcasts</h1>
      {podcasts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {podcasts.map((podcast) => (
            <ContentCard key={podcast.id} content={podcast} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No podcasts found.</p>
        </div>
      )}
    </div>
  );
};

export default Podcasts;
