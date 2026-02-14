import type { Metadata } from 'next';
import { BRAND_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Features',
  description: `Simple tracking, instant updates, smart reminders, and private data. ${BRAND_NAME} helps you never miss what expires.`,
  openGraph: {
    title: `Features | ${BRAND_NAME}`,
    description: `Simple tracking, instant updates, smart reminders. ${BRAND_NAME} helps you never miss what expires.`,
  },
};

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
