import type { Metadata } from 'next';
import { BRAND_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About',
  description: `Why ${BRAND_NAME} was built. Track your expiries in one place—passports, memberships, insurance, and more. Never miss an expiry again.`,
  openGraph: {
    title: `About ${BRAND_NAME}`,
    description: `Why ${BRAND_NAME} was built. Track your expiries in one place.`,
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
