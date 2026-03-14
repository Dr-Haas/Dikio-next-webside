'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import CookieConsent from '@/components/CookieConsent';
import queryClient from '@/lib/query-client';
import '@/i18n/config';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {children}
        <Toaster />
        <Sonner />
        <CookieConsent />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
