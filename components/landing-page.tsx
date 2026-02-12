'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  Sparkles,
  Bell,
  Shield,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { NudgeIcon } from '@/components/nudge-icon';
import { getStatusColors } from '@/lib/expiry-utils';
import type { ExpiryStatus } from '@/lib/types';

const STATUS_ICONS: Record<ExpiryStatus, typeof CheckCircle2> = {
  safe: CheckCircle2,
  approaching: Clock,
  critical: AlertTriangle,
};

export function LandingPage() {
  const router = useRouter();

  const features = [
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background grain mesh-gradient dot-pattern overflow-hidden relative">
      {/* Decorative blobs */}
      <div className="blob blob-1 float-slow" />
      <div className="blob blob-2 float-medium" />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-20 max-w-7xl relative z-10"
      >
        {/* Subtle decorative circles in hero */}
        <div className="absolute top-32 left-[10%] w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-48 right-[15%] w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <Badge className="bg-primary text-primary-foreground border-0 px-4 py-2 text-sm font-medium">
              ✨ Never forget what expires
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-4 md:gap-6 mb-6 text-foreground tracking-tight"
          >
            <NudgeIcon className="w-16 h-16 md:w-24 md:h-24 text-primary" />
            <span className="text-7xl md:text-9xl font-bold">Nudge</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-2xl md:text-3xl text-muted-foreground mb-8 max-w-3xl mx-auto font-light"
          >
            Gentle reminders for everything that expires.
            <br />
            <span className="text-xl">
              Passports, memberships, food, medicine, and more.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Button
              onClick={() => router.push('/auth/signin')}
              size="lg"
              className="cursor-pointer text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
            >
              Get Started Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6"
              onClick={() => {
                document
                  .getElementById('features')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Learn More
            </Button>
          </motion.div>
        </div>

        {/* Demo Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="max-w-5xl mx-auto relative"
        >
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />

          <Card className="p-8 bg-card/90 backdrop-blur-xl border-0 shadow-2xl relative z-10">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Passport',
                  status: 'safe' as ExpiryStatus,
                  year: '2028',
                  daysLeft: '850 days left',
                },
                {
                  name: 'Gym Pass',
                  status: 'approaching' as ExpiryStatus,
                  year: '2026',
                  daysLeft: '5 days left',
                },
                {
                  name: 'Milk',
                  status: 'critical' as ExpiryStatus,
                  year: '2026',
                  daysLeft: '1 day left',
                },
              ].map((item) => {
                const colors = getStatusColors(item.status);
                const StatusIcon = STATUS_ICONS[item.status];
                return (
                  <motion.div key={item.name} whileHover={{ scale: 1.05 }}>
                    <Card
                      textured
                      className={`
                        relative transition-all duration-300 overflow-hidden
                        ${colors.bg} ${colors.glow}
                      `}
                    >
                      <div
                        className={`absolute inset-0 ${colors.tint} pointer-events-none`}
                      />
                      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3 relative z-10">
                        <div className="flex items-start gap-3">
                          <div
                            className={`shrink-0 w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center shadow-sm`}
                          >
                            <StatusIcon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className={`text-xl font-semibold ${colors.text}`}>
                            {item.name}
                          </h3>
                        </div>
                        <Badge
                          title={item.status}
                          className={`
                            inline-flex items-center justify-center rounded-full p-1.5
                            ${colors.badgeBg} ${colors.text} border ${colors.border}
                            shadow-sm
                          `}
                        >
                          <StatusIcon className="size-4 shrink-0" />
                        </Badge>
                      </CardHeader>
                      <CardContent className="space-y-2 relative z-10">
                        <p className={`text-5xl font-bold ${colors.text}`}>
                          {item.year}
                        </p>
                        <p className={`text-sm font-medium opacity-75 ${colors.text}`}>
                          {item.daysLeft}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        id="features"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="container mx-auto px-4 py-20 max-w-7xl"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
            Why Choose Nudge?
          </h2>
          <p className="text-xl text-muted-foreground">
            The simplest way to track everything that matters
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-6 h-full hover:shadow-xl transition-all hover:scale-105 bg-card/80 backdrop-blur group">
                  <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Footer */}
      <div className="container mx-auto px-4 py-8 max-w-7xl border-t">
        <div className="text-center text-muted-foreground">
          <p className="text-sm font-medium">
            Made with care · Never miss what matters
          </p>
        </div>
      </div>
    </div>
  );
}
