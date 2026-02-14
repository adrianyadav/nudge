import type { Metadata } from 'next';
import { BRAND_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contribute',
  description: `${BRAND_NAME} is free forever. Donations help cover hosting and infrastructure costs. Support the app with a one-time contribution.`,
  openGraph: {
    title: `Contribute | ${BRAND_NAME}`,
    description: `${BRAND_NAME} is free forever. Donations help keep it running.`,
  },
};

export default function ContributeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
