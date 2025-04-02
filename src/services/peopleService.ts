
import api from './api';
import { Person } from '@/components/people/PersonCard';

export const fetchAllPeople = async (): Promise<Person[]> => {
  try {
    // In a real app, this would be a separate endpoint
    // For demo, we're using the same endpoint and filtering
    const response = await api.get('/');
    
    // Extract unique people from the content data
    const peopleMap = new Map<string, Person>();
    
    response.data.forEach((item: any) => {
      if (!peopleMap.has(item.personId)) {
        peopleMap.set(item.personId, {
          id: item.personId,
          name: item.personName,
          image: item.personImage,
          description: `Industry leader and expert in ${item.type}s`,
          tags: item.tags || ['tech', 'innovation'],
          isTracking: false, // Default to not tracking
          contentCount: {
            articles: 0,
            videos: 0,
            podcasts: 0
          }
        });
      }
      
      // Count content by type
      const person = peopleMap.get(item.personId);
      if (person) {
        switch (item.type) {
          case 'article':
            person.contentCount.articles++;
            break;
          case 'video':
            person.contentCount.videos++;
            break;
          case 'podcast':
            person.contentCount.podcasts++;
            break;
        }
      }
    });
    
    return Array.from(peopleMap.values());
  } catch (error) {
    console.error('Error fetching people:', error);
    throw new Error('Failed to fetch people');
  }
};

export const fetchPersonById = async (id: string): Promise<Person | null> => {
  try {
    const allPeople = await fetchAllPeople();
    return allPeople.find(person => person.id === id) || null;
  } catch (error) {
    console.error(`Error fetching person ${id}:`, error);
    throw new Error('Failed to fetch person details');
  }
};

export const searchPeople = async (query: string): Promise<Person[]> => {
  try {
    const allPeople = await fetchAllPeople();
    const normalizedQuery = query.toLowerCase().trim();
    
    return allPeople.filter(person => 
      person.name.toLowerCase().includes(normalizedQuery) || 
      (person.description && person.description.toLowerCase().includes(normalizedQuery)) ||
      person.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))
    );
  } catch (error) {
    console.error('Error searching people:', error);
    throw new Error('Failed to search people');
  }
};
