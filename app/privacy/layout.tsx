import type { Metadata } from 'next';
import { BRAND_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy & Security',
  description: `Your data stays yours. Learn how ${BRAND_NAME} protects your information with data isolation, bcrypt password hashing, SSL, and no data selling.`,
  openGraph: {
    title: `Privacy & Security | ${BRAND_NAME}`,
    description: `Your data stays yours. Learn how ${BRAND_NAME} protects your information.`,
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
