'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Sparkles, Bell, Shield } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { BRAND_NAME } from '@/lib/constants';

const FEATURES = [
  {
    icon: Calendar,
    title: 'Simple Tracking',
    description: 'Just add the year and item name. We handle the rest.',
  },
  {
    icon: Sparkles,
    title: 'Instant Updates',
    description: 'See your items update in real-time, no waiting.',
  },
  {
    icon: Bell,
    title: 'Smart Reminders',
    description: 'Visual nudges when things are about to expire.',
  },
  {
    icon: Shield,
    title: 'Private & Secure',
    description: 'Your data is yours. Each user sees only their items.',
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background grain mesh-gradient dot-pattern overflow-hidden relative">
      <Navbar />

      <div className="blob blob-1 float-slow" />
      <div className="blob blob-2 float-medium" />

      <div className="container mx-auto px-4 py-20 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
            Why Choose {BRAND_NAME}?
          </h1>
          <p className="text-xl text-muted-foreground">
            The simplest way to track everything that matters
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-6 h-full hover:shadow-xl transition-all hover:scale-105 bg-card/80 backdrop-blur group"
              >
                <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h2 className="text-xl font-bold mb-2 text-foreground">
                  {feature.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Button asChild size="lg" className="cursor-pointer">
            <Link href="/">Get Started</Link>
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
