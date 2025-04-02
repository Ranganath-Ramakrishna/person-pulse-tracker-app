
import api from './api';
import { Content } from '@/components/content/ContentCard';

// For demos, using npoint.io to host our JSON data
// In production, this would be your real API endpoint

export const fetchAllContent = async (): Promise<Content[]> => {
  try {
    const response = await api.get('/');
    
    // Transform the API response to match our Content interface
    return response.data.map((item: any) => ({
      id: item.id,
      title: item.title,
      summary: item.summary || item.description,
      personId: item.personId,
      personName: item.personName,
      personImage: item.personImage,
      type: item.type,
      source: item.source,
      publishedAt: new Date(item.publishedAt),
      url: item.url,
      thumbnailUrl: item.thumbnailUrl
    }));
  } catch (error) {
    console.error('Error fetching content:', error);
    throw new Error('Failed to fetch content');
  }
};

export const fetchVideoContent = async (): Promise<Content[]> => {
  try {
    const allContent = await fetchAllContent();
    return allContent
      .filter(content => content.type === 'video')
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw new Error('Failed to fetch videos');
  }
};

export const fetchArticleContent = async (): Promise<Content[]> => {
  try {
    const allContent = await fetchAllContent();
    return allContent
      .filter(content => content.type === 'article')
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw new Error('Failed to fetch articles');
  }
};

export const fetchPodcastContent = async (): Promise<Content[]> => {
  try {
    const allContent = await fetchAllContent();
    return allContent
      .filter(content => content.type === 'podcast')
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  } catch (error) {
    console.error('Error fetching podcasts:', error);
    throw new Error('Failed to fetch podcasts');
  }
};

export const fetchContentByPerson = async (personId: string): Promise<Content[]> => {
  try {
    const allContent = await fetchAllContent();
    return allContent
      .filter(content => content.personId === personId)
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  } catch (error) {
    console.error(`Error fetching content for person ${personId}:`, error);
    throw new Error('Failed to fetch content for this person');
  }
};
