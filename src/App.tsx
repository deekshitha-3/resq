
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Posts from "./pages/Posts";
import NotFound from "./pages/NotFound";
import ResqModels from "./pages/ResqModels";
import FloodDetection from "./pages/FloodDetection";
import WildfireDetection from "./pages/WildfireDetection";

// Create a client
const queryClient = new QueryClient();

// Make sure App is defined as a function component
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/models" element={<ResqModels />} />
            <Route path="/models/flood-detection" element={<FloodDetection />} />
            <Route path="/models/wildfire-detection" element={<WildfireDetection />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
