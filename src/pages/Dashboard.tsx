
import React, { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ContentCard, Content } from '@/components/content/ContentCard';
import { PersonCard, Person } from '@/components/people/PersonCard';
import { mockPeople, mockContent } from '@/utils/mockData';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Users, BookOpen, Youtube, Radio } from 'lucide-react';

const Dashboard = () => {
  const [trackedPeople, setTrackedPeople] = useState<Person[]>([]);
  const [recentContent, setRecentContent] = useState<Content[]>([]);

  useEffect(() => {
    // In a real app, we'd fetch this from an API
    // For now, use mock data and filter to show only tracked people
    const tracked = mockPeople.filter(p => p.isTracking);
    setTrackedPeople(tracked);
    
    // Get recent content from tracked people
    const content = mockContent
      .filter(c => tracked.some(p => p.id === c.personId))
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
      .slice(0, 6);
    setRecentContent(content);
  }, []);

  const handleToggleTracking = (id: string) => {
    setTrackedPeople(prev =>
      prev.map(person =>
        person.id === id
          ? { ...person, isTracking: !person.isTracking }
          : person
      ).filter(person => person.isTracking)
    );
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome to Person Pulse Tracker. Keep up with your favorite personalities.
            </p>
          </div>
          <Button asChild>
            <Link to="/search">Add People to Track</Link>
          </Button>
        </div>
        
        {trackedPeople.length === 0 ? (
          <Card className="bg-accent/50">
            <CardContent className="pt-6 flex flex-col items-center justify-center text-center space-y-4">
              <Users size={64} className="text-pulse-400" />
              <div>
                <h3 className="text-lg font-medium">No people tracked yet</h3>
                <p className="text-muted-foreground">
                  Start tracking people to see their latest content here.
                </p>
              </div>
              <Button asChild>
                <Link to="/search">Find People to Track</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">People You're Tracking</h2>
                <Button variant="outline" asChild size="sm">
                  <Link to="/people">View All</Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {trackedPeople.slice(0, 3).map((person) => (
                  <PersonCard
                    key={person.id}
                    person={person}
                    onToggleTracking={handleToggleTracking}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Latest Content</h2>
              </div>
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="articles" className="flex items-center gap-1">
                    <BookOpen size={14} />
                    <span>Articles</span>
                  </TabsTrigger>
                  <TabsTrigger value="videos" className="flex items-center gap-1">
                    <Youtube size={14} />
                    <span>Videos</span>
                  </TabsTrigger>
                  <TabsTrigger value="podcasts" className="flex items-center gap-1">
                    <Radio size={14} />
                    <span>Podcasts</span>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recentContent.map((content) => (
                      <ContentCard key={content.id} content={content} />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="articles" className="mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recentContent
                      .filter((content) => content.type === 'article')
                      .map((content) => (
                        <ContentCard key={content.id} content={content} />
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="videos" className="mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recentContent
                      .filter((content) => content.type === 'video')
                      .map((content) => (
                        <ContentCard key={content.id} content={content} />
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="podcasts" className="mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recentContent
                      .filter((content) => content.type === 'podcast')
                      .map((content) => (
                        <ContentCard key={content.id} content={content} />
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default Dashboard;
