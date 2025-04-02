
import React from 'react';
import { ContentCard, Content } from '@/components/content/ContentCard';
import { useQuery } from '@tanstack/react-query';

// Mock function to fetch articles
const fetchArticles = async (): Promise<Content[]> => {
  // In a real app, this would be an API call
  return [
    {
      id: '1',
      title: 'Understanding Modern Web Development',
      summary: 'An in-depth look at the current state of web development and where it\'s heading.',
      personId: 'p1',
      personName: 'Emma Johnson',
      personImage: 'https://i.pravatar.cc/150?u=emma',
      type: 'article',
      source: 'Medium',
      publishedAt: new Date('2023-11-10'),
      url: 'https://medium.com/article',
      thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    },
    {
      id: '2',
      title: 'React 18 Features You Should Know About',
      summary: 'Discover the new features in React 18 and how they can improve your application performance.',
      personId: 'p2',
      personName: 'Michael Chen',
      personImage: 'https://i.pravatar.cc/150?u=michael',
      type: 'article',
      source: 'Dev.to',
      publishedAt: new Date('2023-10-15'),
      url: 'https://dev.to/article',
      thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
    },
    {
      id: '3',
      title: 'The Future of AI in Software Development',
      summary: 'How artificial intelligence is changing the way we write and maintain code.',
      personId: 'p3',
      personName: 'Sarah Williams',
      personImage: 'https://i.pravatar.cc/150?u=sarah',
      type: 'article',
      source: 'TechCrunch',
      publishedAt: new Date('2023-09-22'),
      url: 'https://techcrunch.com/article',
      thumbnailUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
    }
  ];
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ContentCard key={article.id} content={article} />
        ))}
      </div>
    </div>
  );
};

export default Articles;
