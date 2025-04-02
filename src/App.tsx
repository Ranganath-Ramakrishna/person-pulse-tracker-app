
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import People from "./pages/People";
import PersonDetail from "./pages/PersonDetail";
import NotFound from "./pages/NotFound";
import { AppLayout } from "./components/layout/AppLayout";
import Articles from "./pages/content/Articles";
import Videos from "./pages/content/Videos";
import Podcasts from "./pages/content/Podcasts";

// Create a new QueryClient instance outside of the component
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AppLayout><Dashboard /></AppLayout>} />
              <Route path="/search" element={<AppLayout><Search /></AppLayout>} />
              <Route path="/people" element={<AppLayout><People /></AppLayout>} />
              <Route path="/people/:id" element={<AppLayout><PersonDetail /></AppLayout>} />
              <Route path="/content/articles" element={<AppLayout><Articles /></AppLayout>} />
              <Route path="/content/videos" element={<AppLayout><Videos /></AppLayout>} />
              <Route path="/content/podcasts" element={<AppLayout><Podcasts /></AppLayout>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
