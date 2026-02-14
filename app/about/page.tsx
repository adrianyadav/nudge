'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Mail, Lightbulb, Map, Globe, Bell, Calendar, Smartphone, Heart } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { BRAND_NAME } from '@/lib/constants';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background grain mesh-gradient dot-pattern overflow-hidden relative">
      <Navbar />

      <div className="blob blob-1 float-slow" />
      <div className="blob blob-2 float-medium" />

      <div className="container mx-auto px-4 py-20 max-w-7xl relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex w-14 h-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
            <Lightbulb className="w-7 h-7" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
            About {BRAND_NAME}
          </h1>
          <p className="text-xl text-muted-foreground">
            Why I built this
          </p>
        </div>

        <Card className="p-8 max-w-3xl mx-auto bg-card/80 backdrop-blur hover:shadow-xl transition-all">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shrink-0">
              <User className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">
                My expiries weren&apos;t tracked anywhere
              </h2>
              <p className="text-muted-foreground text-sm">
                Passports, memberships, insurance, subscriptions - they all have
                expiry dates, but I had nothing in one place to remind me. I
                realised I was relying on scattered emails and hope.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">
                A registration expired because I didn&apos;t notice the email
              </h2>
              <p className="text-muted-foreground text-sm">
                That was the final nudge I needed. I built {BRAND_NAME} so that I and anyone else could see everything in one place.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
              <Map className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground">
              Roadmap
            </h2>
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            This is just V1. I&apos;m working on a few features to make {BRAND_NAME} even better.
          </p>
          <ul className="space-y-3 text-muted-foreground text-sm">
            <li className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>A browser extension to easily add items to {BRAND_NAME} — imagine that you are buying insurance and the extension lets you easily add it to {BRAND_NAME}.</span>
            </li>
            <li className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>Automatic email reminders based on your settings.</span>
            </li>
            <li className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>Calendar sync to automatically add items to {BRAND_NAME} when you add them to your calendar.</span>
            </li>
            <li className="flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>A mobile app so you can add items on the go.</span>
            </li>
          </ul>

          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">
              I&apos;m{" "}
              <a
                href="https://adrianyadav.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline cursor-pointer"
              >
                Adrian Yadav
              </a>
              , I appreciate you checking out {BRAND_NAME} 👍
            </p>
            <p className="text-muted-foreground text-sm">
              Have thoughts or suggestions? Just email me at{" "}
              <a
                href="mailto:adrianyadav@gmail.com"
                className="text-primary font-medium hover:underline cursor-pointer"
              >
                adrianyadav@gmail.com
              </a>
            </p>
          </div>
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
