import { ExpiryStatus, ExpiryItem, ExpiryItemWithStatus } from './types';

/**
 * Calculate days until expiry from today
 */
export function calculateDaysUntilExpiry(expiryDate: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const expiry = new Date(expiryDate);
  expiry.setHours(0, 0, 0, 0);

  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}

/**
 * Determine expiry status based on days remaining
 * - safe: > 7 days
 * - approaching: 3-7 days
 * - critical: < 3 days
 */
export function getExpiryStatus(daysUntilExpiry: number): ExpiryStatus {
  if (daysUntilExpiry > 7) return 'safe';
  if (daysUntilExpiry >= 3) return 'approaching';
  return 'critical';
}

/**
 * Get color classes for Tailwind based on status
 */
export function getStatusColors(status: ExpiryStatus): {
  bg: string;
  border: string;
  text: string;
  glow: string;
  tint: string;
  iconBg: string;
  badgeBg: string;
} {
  switch (status) {
    case 'safe':
      return {
        bg: 'bg-gradient-to-br from-green-50 to-emerald-100',
        border: 'border-green-500',
        text: 'text-green-700',
        glow: 'shadow-[0_0_20px_rgba(34,197,94,0.25)]',
        tint: 'bg-emerald-500/10',
        iconBg: 'bg-gradient-to-br from-emerald-500 to-green-600',
        badgeBg: 'bg-green-500/20 dark:bg-green-500/25',
      };
    case 'approaching':
      return {
        bg: 'bg-gradient-to-br from-amber-50 to-orange-100',
        border: 'border-amber-500',
        text: 'text-amber-700',
        glow: 'shadow-[0_0_20px_rgba(245,158,11,0.25)]',
        tint: 'bg-amber-500/10',
        iconBg: 'bg-gradient-to-br from-amber-500 to-orange-500',
        badgeBg: 'bg-amber-500/20 dark:bg-amber-500/25',
      };
    case 'critical':
      return {
        bg: 'bg-gradient-to-br from-red-50 to-rose-100',
        border: 'border-red-500',
        text: 'text-red-700',
        glow: 'shadow-[0_0_20px_rgba(239,68,68,0.25)]',
        tint: 'bg-red-500/10',
        iconBg: 'bg-gradient-to-br from-red-500 to-rose-600',
        badgeBg: 'bg-red-500/20 dark:bg-red-500/25',
      };
  }
}

/**
 * Enrich item with status and days calculation
 */
export function enrichItemWithStatus(item: ExpiryItem): ExpiryItemWithStatus {
  const daysUntilExpiry = calculateDaysUntilExpiry(item.expiry_date);
  const status = getExpiryStatus(daysUntilExpiry);

  return {
    ...item,
    status,
    daysUntilExpiry,
  };
}

/**
 * Format date for display
 */
export function formatDisplayDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format date for input[type="date"]
 */
export function formatInputDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
}
