
import React from 'react';
import { ContentCard, Content } from '@/components/content/ContentCard';
import { useQuery } from '@tanstack/react-query';
import { fetchPodcastContent } from '@/services/contentService';
import { Skeleton } from '@/components/ui/skeleton';

const Podcasts = () => {
  const { data: podcasts = [], isLoading, error } = useQuery({
    queryKey: ['podcasts'],
    queryFn: fetchPodcastContent
  });

  if (isLoading) {
    return (
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Podcasts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Podcasts</h1>
        <div className="p-8 text-center">
          <p className="text-red-500">Error loading podcasts</p>
          <p className="text-muted-foreground mt-2">
            {error instanceof Error ? error.message : 'An unknown error occurred'}
          </p>
        </div>
      </div>
    );
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
