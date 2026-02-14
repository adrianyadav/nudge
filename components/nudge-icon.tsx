import { cn } from '@/lib/utils';
import { BRAND_NAME } from '@/lib/constants';

interface NudgeIconProps {
  className?: string;
  size?: number;
}

export function NudgeIcon({ className, size = 64 }: NudgeIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
      className={cn('shrink-0', className)}
      width={size}
      height={size}
    >
      <title>{BRAND_NAME}</title>
      <circle cx="32" cy="34" r="22" fill="currentColor" opacity="0.85" />
      <circle cx="54" cy="26" r="12" fill="currentColor" />
    </svg>
  );
}
