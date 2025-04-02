
import React, { useState, useEffect } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { PersonCard, Person } from '@/components/people/PersonCard';
import { mockPeople } from '@/utils/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from "@/components/ui/use-toast";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, we'd fetch this from an API
    setPeople(mockPeople);
  }, []);

  const handleToggleTracking = (id: string) => {
    setPeople(prev =>
      prev.map(person =>
        person.id === id ? { ...person, isTracking: !person.isTracking } : person
      )
    );
    
    const person = people.find(p => p.id === id);
    if (person) {
      toast({
        title: person.isTracking ? `Untracked ${person.name}` : `Now tracking ${person.name}`,
        description: person.isTracking 
          ? `You'll no longer see updates from ${person.name}.`
          : `You'll now receive the latest updates from ${person.name}.`,
      });
    }
  };

  const trackedPeople = people.filter(person => person.isTracking);
  const allPeople = people;

  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">People</h1>
            <p className="text-muted-foreground">
              Manage the people you're tracking.
            </p>
          </div>
          <Button asChild>
            <Link to="/search">Find More People</Link>
          </Button>
        </div>
        
        <Tabs defaultValue="tracked">
          <TabsList>
            <TabsTrigger value="tracked">Tracked People</TabsTrigger>
            <TabsTrigger value="all">All People</TabsTrigger>
          </TabsList>
          <TabsContent value="tracked" className="mt-4">
            {trackedPeople.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {trackedPeople.map((person) => (
                  <PersonCard
                    key={person.id}
                    person={person}
                    onToggleTracking={handleToggleTracking}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 space-y-4">
                <p className="text-muted-foreground">
                  You're not tracking anyone yet.
                </p>
                <Button asChild>
                  <Link to="/search">Find People to Track</Link>
                </Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="all" className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {allPeople.map((person) => (
                <PersonCard
                  key={person.id}
                  person={person}
                  onToggleTracking={handleToggleTracking}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default People;
