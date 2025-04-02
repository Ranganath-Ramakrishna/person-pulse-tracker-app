
import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { Home, Search, Users, BookOpen, Youtube, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const AppSidebar = () => {
  // Menu items
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Users, label: 'People', path: '/people' },
  ];

  // Content type items
  const contentTypes = [
    { icon: BookOpen, label: 'Articles', path: '/content/articles' },
    { icon: Youtube, label: 'Videos', path: '/content/videos' },
    { icon: Radio, label: 'Podcasts', path: '/content/podcasts' },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-md bg-pulse-500 p-2 text-white">
            <Users size={20} />
          </div>
          <span className="font-bold text-lg">Pulse Tracker</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="flex items-center gap-2">
                      <item.icon size={18} />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Content Types</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {contentTypes.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <Link to={item.path} className="flex items-center gap-2">
                      <item.icon size={18} />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Person Pulse Tracker</span>
          <SidebarTrigger>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <span className="sr-only">Toggle Sidebar</span>
              <span className="h-4 w-4 rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </span>
            </Button>
          </SidebarTrigger>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
