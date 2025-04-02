
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { mockPeople, mockContent } from '@/utils/mockData';
import { Person } from '@/components/people/PersonCard';
import { Content, ContentCard } from '@/components/content/ContentCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Youtube, Radio, ChevronLeft } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const PersonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [person, setPerson] = useState<Person | null>(null);
  const [personContent, setPersonContent] = useState<Content[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, this would be an API call
    const foundPerson = mockPeople.find(p => p.id === id);
    if (foundPerson) {
      setPerson(foundPerson);
      
      // Get content for this person
      const content = mockContent
        .filter(c => c.personId === id)
        .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
      setPersonContent(content);
    }
  }, [id]);

  const handleToggleTracking = () => {
    if (!person) return;
    
    setPerson(prev => 
      prev ? { ...prev, isTracking: !prev.isTracking } : null
    );
    
    toast({
      title: person.isTracking ? `Untracked ${person.name}` : `Now tracking ${person.name}`,
      description: person.isTracking 
        ? `You'll no longer see updates from ${person.name}.`
        : `You'll now receive the latest updates from ${person.name}.`,
    });
  };

  if (!person) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Person not found</h1>
          <Button asChild>
            <Link to="/people">Back to People</Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  const initials = person.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const articles = personContent.filter(c => c.type === 'article');
  const videos = personContent.filter(c => c.type === 'video');
  const podcasts = personContent.filter(c => c.type === 'podcast');

  return (
    <AppLayout>
      <div className="space-y-8">
        <Button variant="ghost" asChild className="flex items-center gap-1 mb-4 -ml-2">
          <Link to="/people">
            <ChevronLeft size={16} />
            <span>Back to People</span>
          </Link>
        </Button>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <Avatar className="h-24 w-24 md:h-32 md:w-32">
              <AvatarImage src={person.image} />
              <AvatarFallback className="bg-pulse-100 text-pulse-600 text-3xl">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-grow space-y-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{person.name}</h1>
              <div className="flex flex-wrap gap-1 mt-2">
                {person.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <p className="text-muted-foreground">
              {person.description || `Track the latest content from ${person.name}.`}
            </p>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <BookOpen size={18} className="text-pulse-500" />
                <span>{person.contentCount.articles} Articles</span>
              </div>
              <div className="flex items-center gap-1">
                <Youtube size={18} className="text-pulse-500" />
                <span>{person.contentCount.videos} Videos</span>
              </div>
              <div className="flex items-center gap-1">
                <Radio size={18} className="text-pulse-500" />
                <span>{person.contentCount.podcasts} Podcasts</span>
              </div>
            </div>
            
            <Button
              variant={person.isTracking ? "destructive" : "default"}
              onClick={handleToggleTracking}
              className="mt-4"
            >
              {person.isTracking ? "Untrack" : "Track"}
            </Button>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Latest Content</h2>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="articles" className="flex items-center gap-1">
                <BookOpen size={14} />
                <span>Articles ({articles.length})</span>
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-1">
                <Youtube size={14} />
                <span>Videos ({videos.length})</span>
              </TabsTrigger>
              <TabsTrigger value="podcasts" className="flex items-center gap-1">
                <Radio size={14} />
                <span>Podcasts ({podcasts.length})</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4">
              {personContent.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {personContent.map((content) => (
                    <ContentCard key={content.id} content={content} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No content found for this person.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="articles" className="mt-4">
              {articles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {articles.map((content) => (
                    <ContentCard key={content.id} content={content} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No articles found for this person.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="videos" className="mt-4">
              {videos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {videos.map((content) => (
                    <ContentCard key={content.id} content={content} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No videos found for this person.</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="podcasts" className="mt-4">
              {podcasts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {podcasts.map((content) => (
                    <ContentCard key={content.id} content={content} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No podcasts found for this person.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
};

export default PersonDetail;
