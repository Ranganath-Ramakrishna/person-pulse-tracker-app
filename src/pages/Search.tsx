import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { SearchBar } from '@/components/search/SearchBar';
import { PersonCard, Person } from '@/components/people/PersonCard';
import { mockPeople } from '@/utils/mockData';
import { Search as SearchIcon } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Search = () => {
  const [searchResults, setSearchResults] = useState<Person[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const handleSearch = (query: string) => {
    // Improved search that does case-insensitive partial matching
    const normalizedQuery = query.toLowerCase().trim();
    const results = mockPeople.filter(person =>
      person.name.toLowerCase().includes(normalizedQuery) || 
      (person.description && person.description.toLowerCase().includes(normalizedQuery)) ||
      person.tags.some(tag => tag.toLowerCase().includes(normalizedQuery))
    );
    
    setSearchResults(results);
    setHasSearched(true);
    
    if (results.length === 0) {
      toast({
        title: "No results found",
        description: `We couldn't find any people matching "${query}". Try a different search term.`,
      });
    } else {
      toast({
        title: `Found ${results.length} result${results.length === 1 ? '' : 's'}`,
        description: `${results.length} people match your search for "${query}".`,
      });
    }
  };

  const handleToggleTracking = (id: string) => {
    setSearchResults(prev =>
      prev.map(person =>
        person.id === id ? { ...person, isTracking: !person.isTracking } : person
      )
    );
    
    const person = searchResults.find(p => p.id === id);
    if (person) {
      toast({
        title: person.isTracking ? `Untracked ${person.name}` : `Now tracking ${person.name}`,
        description: person.isTracking 
          ? `You'll no longer see updates from ${person.name}.`
          : `You'll now receive the latest updates from ${person.name}.`,
      });
    }
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Search</h1>
          <p className="text-muted-foreground">
            Find people to track their content.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <SearchBar onSearch={handleSearch} />
        </div>

        {hasSearched && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Search Results</h2>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((person) => (
                  <PersonCard
                    key={person.id}
                    person={person}
                    onToggleTracking={handleToggleTracking}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
                <SearchIcon size={64} className="text-muted-foreground" />
                <div>
                  <h3 className="text-lg font-medium">No results found</h3>
                  <p className="text-muted-foreground">
                    Try searching for a different term or try a different filter.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
        
        {!hasSearched && (
          <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
            <SearchIcon size={64} className="text-pulse-300" />
            <div>
              <h3 className="text-lg font-medium">Search for people</h3>
              <p className="text-muted-foreground">
                Enter a name above to find people you want to track.
              </p>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Search;
