export type ExpiryStatus = 'safe' | 'approaching' | 'critical';

export interface User {
  id: number;
  email: string;
  password_hash: string | null;
  name: string | null;
  created_at: string;
  updated_at: string;
}

export interface ExpiryItem {
  id: number;
  name: string;
  expiry_date: string; // ISO date string
  user_id: number | null;
  archived_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ExpiryItemWithStatus extends ExpiryItem {
  status: ExpiryStatus;
  daysUntilExpiry: number;
}

export interface CreateExpiryItemDTO {
  name: string;
  expiry_date: string;
}

export interface UpdateExpiryItemDTO extends CreateExpiryItemDTO {
  id: number;
}
