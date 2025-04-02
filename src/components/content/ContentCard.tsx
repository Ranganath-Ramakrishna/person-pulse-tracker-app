
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BookOpen, Youtube, Radio, Calendar, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export interface Content {
  id: string;
  title: string;
  summary: string;
  personId: string;
  personName: string;
  personImage?: string;
  type: 'article' | 'video' | 'podcast';
  source: string;
  publishedAt: Date;
  url: string;
  thumbnailUrl?: string;
}

interface ContentCardProps {
  content: Content;
}

export const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
  const getIcon = () => {
    switch (content.type) {
      case 'article':
        return <BookOpen className="h-4 w-4" />;
      case 'video':
        return <Youtube className="h-4 w-4" />;
      case 'podcast':
        return <Radio className="h-4 w-4" />;
    }
  };

  const getTypeColor = () => {
    switch (content.type) {
      case 'article':
        return "bg-blue-100 text-blue-800 border-blue-200";
      case 'video':
        return "bg-red-100 text-red-800 border-red-200";
      case 'podcast':
        return "bg-green-100 text-green-800 border-green-200";
    }
  };

  const initials = content.personName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-md overflow-hidden">
      {content.thumbnailUrl && (
        <div className="relative w-full h-40">
          <img 
            src={content.thumbnailUrl} 
            alt={content.title} 
            className="w-full h-full object-cover"
          />
          <Badge className={`absolute top-2 right-2 ${getTypeColor()}`}>
            <span className="flex items-center gap-1">
              {getIcon()}
              {content.type}
            </span>
          </Badge>
        </div>
      )}
      <CardHeader className={content.thumbnailUrl ? "pt-3" : "pt-4"}>
        <div className="flex justify-between items-start gap-2 mb-2">
          {!content.thumbnailUrl && (
            <Badge className={getTypeColor()}>
              <span className="flex items-center gap-1">
                {getIcon()}
                {content.type}
              </span>
            </Badge>
          )}
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            {formatDistanceToNow(new Date(content.publishedAt), { addSuffix: true })}
          </div>
        </div>
        <CardTitle className="text-base line-clamp-2">{content.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow py-1">
        <p className="text-sm text-muted-foreground line-clamp-3">{content.summary}</p>
      </CardContent>
      <CardFooter className="pt-3 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={content.personImage} />
            <AvatarFallback className="bg-pulse-100 text-pulse-600 text-xs">{initials}</AvatarFallback>
          </Avatar>
          <span className="text-xs font-medium">{content.personName}</span>
        </div>
        <Button size="sm" variant="outline" asChild>
          <a href={content.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
            <span>Visit</span>
            <ExternalLink size={12} />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
