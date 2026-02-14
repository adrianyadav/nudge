'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Database, Eye, UserCheck, Trash2, Server } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const PRIVACY_ITEMS = [
  {
    icon: Lock,
    title: 'Encrypted at rest',
    description:
      'Your item names are encrypted with AES-256-GCM before they reach the database. Each value gets a unique initialisation vector and an authentication tag for tamper detection. Even if the database were compromised, your data would be unreadable without the encryption key.',
  },
  {
    icon: UserCheck,
    title: 'Password security',
    description:
      'Passwords are hashed with bcrypt (10 salt rounds) before storage. We never store or log plain-text passwords. Authentication is handled by NextAuth with signed JWT sessions.',
  },
  {
    icon: Database,
    title: 'Data isolation',
    description:
      'Every item is scoped to your account via a foreign key. Server actions verify your session before any read or write. You can only ever see your own data.',
  },
  {
    icon: Server,
    title: 'Secure infrastructure',
    description:
      'The database is hosted on Neon PostgreSQL with SSL-only connections. All production traffic is served over HTTPS. Session tokens are signed with a secret key.',
  },
  {
    icon: Eye,
    title: 'No tracking or selling',
    description:
      'We collect only what the app needs to function: your email, an optional display name, and the items you add. No analytics trackers, no ad networks, no data brokers. Your information is never shared with third parties.',
  },
  {
    icon: Trash2,
    title: 'You own your data',
    description:
      'Archive or permanently delete any item at any time. If you delete your account, all associated data is cascade-deleted from the database immediately.',
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background grain mesh-gradient dot-pattern overflow-hidden relative">
      <Navbar />

      <div className="blob blob-1 float-slow" />
      <div className="blob blob-2 float-medium" />

      <div className="container mx-auto px-4 py-20 max-w-7xl relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
            Privacy & Security
          </h1>
          <p className="text-xl text-muted-foreground">
            Your data stays yours. Here&apos;s how we protect it.
          </p>
        </div>

        <Card className="p-8 max-w-3xl mx-auto bg-card/80 backdrop-blur hover:shadow-xl transition-all">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">
                Built with security first
              </h2>
              <p className="text-muted-foreground text-sm">
                Encryption, isolation, and minimal data collection are baked into every layer of the stack.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {PRIVACY_ITEMS.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
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
