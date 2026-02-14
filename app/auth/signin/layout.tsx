import type { Metadata } from 'next';
import { BRAND_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Sign In',
  description: `Sign in to ${BRAND_NAME} to track your expiring items. Passports, memberships, food, medicine—never miss what matters.`,
  robots: {
    index: false,
    follow: true,
  },
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
