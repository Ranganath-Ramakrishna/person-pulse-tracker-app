
import React from 'react';
import { ContentCard, Content } from '@/components/content/ContentCard';
import { useQuery } from '@tanstack/react-query';

// Mock function to fetch podcasts
const fetchPodcasts = async (): Promise<Content[]> => {
  // In a real app, this would be an API call
  return [
    {
      id: 'pod1',
      title: 'The Future of JavaScript',
      summary: 'Discussing the upcoming features and changes to JavaScript that will shape web development.',
      personId: 'p1',
      personName: 'Emma Johnson',
      personImage: 'https://i.pravatar.cc/150?u=emma',
      type: 'podcast',
      source: 'CodeCast',
      publishedAt: new Date('2023-11-08'),
      url: 'https://codecast.com/episode123',
      thumbnailUrl: 'https://images.unsplash.com/photo-1598395927056-8d895e701c3b',
    },
    {
      id: 'pod2',
      title: 'Web Accessibility Deep Dive',
      summary: 'Making the web better for everyone through proper accessibility practices.',
      personId: 'p2',
      personName: 'Michael Chen',
      personImage: 'https://i.pravatar.cc/150?u=michael',
      type: 'podcast',
      source: 'Frontend Happy Hour',
      publishedAt: new Date('2023-10-20'),
      url: 'https://frontendhappyhour.com/episode456',
      thumbnailUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc',
    },
    {
      id: 'pod3',
      title: 'Building Sustainable Tech Teams',
      summary: 'Strategies for creating and maintaining happy, productive engineering teams.',
      personId: 'p3',
      personName: 'Sarah Williams',
      personImage: 'https://i.pravatar.cc/150?u=sarah',
      type: 'podcast',
      source: 'Tech Leaders Talk',
      publishedAt: new Date('2023-09-15'),
      url: 'https://techleaders.com/episode789',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581368135153-a506cf13b1e1',
    }
  ];
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {podcasts.map((podcast) => (
          <ContentCard key={podcast.id} content={podcast} />
        ))}
      </div>
    </div>
  );
};

export default Podcasts;
