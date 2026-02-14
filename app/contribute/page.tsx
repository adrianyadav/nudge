'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Coffee } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { BRAND_NAME } from '@/lib/constants';

const DONATION_LINKS = [
  { amount: 3, url: process.env.NEXT_PUBLIC_STRIPE_DONATION_LINK_3 },
  { amount: 5, url: process.env.NEXT_PUBLIC_STRIPE_DONATION_LINK_5 },
  { amount: 10, url: process.env.NEXT_PUBLIC_STRIPE_DONATION_LINK_10 },
  { amount: 25, url: process.env.NEXT_PUBLIC_STRIPE_DONATION_LINK_25 },
].filter((d): d is { amount: number; url: string } => typeof d.url === 'string' && d.url.length > 0);

const CUSTOM_LINK = process.env.NEXT_PUBLIC_STRIPE_DONATION_LINK_CUSTOM;
const HAS_DONATION_LINKS = DONATION_LINKS.length > 0 || (typeof CUSTOM_LINK === 'string' && CUSTOM_LINK.length > 0);

export default function ContributePage() {
  return (
    <div className="min-h-screen bg-background grain mesh-gradient dot-pattern overflow-hidden relative">
      <Navbar />

      <div className="blob blob-1 float-slow" />
      <div className="blob blob-2 float-medium" />

      <div className="container mx-auto px-4 py-20 max-w-7xl relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
            Contribute to {BRAND_NAME}
          </h1>
          <p className="text-xl text-muted-foreground">
            Free forever. Donations help keep it running.
          </p>
        </div>

        <Card className="p-8 max-w-3xl mx-auto bg-card/80 backdrop-blur hover:shadow-xl transition-all">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">
                {BRAND_NAME} is free forever
              </h2>
              <p className="text-muted-foreground text-sm">
                We believe everyone deserves a simple way to track what matters.
                No subscriptions, no paywalls, no ads.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shrink-0">
              <Coffee className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">
                Donations help with app costs
              </h2>
              <p className="text-muted-foreground text-sm">
                Hosting, domains, and infrastructure cost money. If {BRAND_NAME} has
                been useful to you, a donation helps cover these costs and keeps
                the app running for everyone.
              </p>
            </div>
          </div>

          <p className="text-muted-foreground text-sm">
            Thank you for using {BRAND_NAME}. Whether you donate or not, we&apos;re glad
            you&apos;re here.
          </p>

          {HAS_DONATION_LINKS && (
            <div className="mt-8 pt-6 border-t border-border/50">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                Support with a donation
              </h3>
              <div className="flex flex-wrap gap-3">
                {DONATION_LINKS.map((d) => (
                  <Button
                    key={d.amount}
                    asChild
                    size="default"
                    className="cursor-pointer"
                  >
                    <a
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ${d.amount}
                    </a>
                  </Button>
                ))}
                {typeof CUSTOM_LINK === 'string' && CUSTOM_LINK.length > 0 && (
                  <Button
                    asChild
                    variant="outline"
                    size="default"
                    className="cursor-pointer"
                  >
                    <a
                      href={CUSTOM_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Custom amount
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
        </Card>

        <div className="mt-16 text-center">
          <Button asChild size="lg" variant="outline" className="cursor-pointer">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
