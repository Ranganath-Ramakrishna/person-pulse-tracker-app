
import React from 'react';
import { ContentCard, Content } from '@/components/content/ContentCard';
import { useQuery } from '@tanstack/react-query';
import { mockContent } from '@/utils/mockData';

// Function to fetch articles from mock data
const fetchArticles = async (): Promise<Content[]> => {
  // In a real app, this would be an API call
  // For now, filter articles from the main mockContent array
  return mockContent
    .filter(content => content.type === 'article')
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
};

const Articles = () => {
  const { data: articles = [], isLoading, error } = useQuery({
    queryKey: ['articles'],
    queryFn: fetchArticles
  });

  if (isLoading) {
    return <div className="p-8 text-center">Loading articles...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error loading articles</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Articles</h1>
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ContentCard key={article.id} content={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No articles found.</p>
        </div>
      )}
    </div>
  );
};

export default Articles;
