
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Youtube, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface Person {
  id: string;
  name: string;
  image?: string;
  description?: string;
  tags: string[];
  contentCount: {
    articles: number;
    videos: number;
    podcasts: number;
  };
  isTracking?: boolean;
}

interface PersonCardProps {
  person: Person;
  onToggleTracking: (id: string) => void;
}

export const PersonCard: React.FC<PersonCardProps> = ({ person, onToggleTracking }) => {
  const initials = person.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-md">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={person.image} alt={person.name} />
          <AvatarFallback className="bg-pulse-100 text-pulse-600">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg">{person.name}</CardTitle>
          <div className="flex flex-wrap gap-1 mt-1">
            {person.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow py-2">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {person.description || `Track the latest content from ${person.name}.`}
        </p>
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-1">
            <BookOpen size={14} className="text-pulse-500" />
            <span className="text-xs">{person.contentCount.articles}</span>
          </div>
          <div className="flex items-center gap-1">
            <Youtube size={14} className="text-pulse-500" />
            <span className="text-xs">{person.contentCount.videos}</span>
          </div>
          <div className="flex items-center gap-1">
            <Radio size={14} className="text-pulse-500" />
            <span className="text-xs">{person.contentCount.podcasts}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <Button
          variant={person.isTracking ? "destructive" : "default"}
          size="sm"
          onClick={() => onToggleTracking(person.id)}
        >
          {person.isTracking ? "Untrack" : "Track"}
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link to={`/people/${person.id}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
