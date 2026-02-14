'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { NudgeIcon } from '@/components/nudge-icon';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export function Navbar() {
  const router = useRouter();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50"
    >
      <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <NudgeIcon className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold text-foreground">Nudge</span>
        </Link>

        <Button
          variant="outline"
          onClick={() => router.push('/auth/signin')}
          className="cursor-pointer"
        >
          Log in
        </Button>
      </div>
    </motion.nav>
  );
}
