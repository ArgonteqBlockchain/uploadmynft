export type CryptoOrderStatus = 'completed' | 'pending' | 'failed';

export interface CryptoOrder {
  id: string;
  State: CryptoOrderStatus;
  Policy: string;
  Supply: number;
  Tokenprefix: string;
  Count: string;
  Sold: string;
  Reserved: number;
  Free: number;
}

// Modified
