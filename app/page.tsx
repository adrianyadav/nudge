'use client';

import { useSession } from 'next-auth/react';
import { LandingPage } from '@/components/landing-page';
import { Dashboard } from '@/components/dashboard';

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div
          className="w-16 h-16 border-4 border-border border-t-primary rounded-full animate-spin"
        />
      </div>
    );
  }

  return status === 'authenticated' ? <Dashboard /> : <LandingPage />;
}
