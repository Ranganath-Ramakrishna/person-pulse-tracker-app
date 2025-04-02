
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

export const MobileHeader = () => {
  return (
    <header className="w-full p-4 border-b flex items-center justify-between lg:hidden">
      <div className="flex items-center gap-2">
        <SidebarTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu size={20} />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </SidebarTrigger>
        <span className="font-bold">Pulse Tracker</span>
      </div>
    </header>
  );
};
