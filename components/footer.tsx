'use client';

import Link from 'next/link';
import { NudgeIcon } from '@/components/nudge-icon';
import { BRAND_NAME } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-cyan-100 bg-cyan-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2 text-cyan-950 hover:text-cyan-900 hover:bg-primary/10 rounded-md px-2 py-1 transition-colors">
            <NudgeIcon className="w-6 h-6 text-cyan-950" />
            <span className="font-semibold">{BRAND_NAME}</span>
          </Link>

          <nav className="flex items-center gap-6" aria-label="Footer navigation">
            <Link
              href="/about"
              className="text-sm text-cyan-950 hover:text-cyan-900 hover:bg-primary/10 rounded-md px-2 py-1 transition-colors"
            >
              About
            </Link>
            <Link
              href="/features"
              className="text-sm text-cyan-950 hover:text-cyan-900 hover:bg-primary/10 rounded-md px-2 py-1 transition-colors"
            >
              Features
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-cyan-950 hover:text-cyan-900 hover:bg-primary/10 rounded-md px-2 py-1 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/contribute"
              className="text-sm text-cyan-950 hover:text-cyan-900 hover:bg-primary/10 rounded-md px-2 py-1 transition-colors"
            >
              Contribute
            </Link>
          </nav>
        </div>

        <div className="mt-6 pt-6 border-t border-cyan-100 text-center md:text-left">
          <p className="text-sm text-cyan-950">
            Made with care · Never miss what matters
          </p>
        </div>
      </div>
    </footer>
  );

}
