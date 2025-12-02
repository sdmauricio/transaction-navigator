export type TransactionSource = 'aditum' | 'bcodex' | 'semae';

export type TransactionStatus = 'reconciled' | 'pending' | 'lost' | 'deficit';

export interface Transaction {
  id: string;
  source: TransactionSource;
  amount: number;
  date: string;
  reference: string;
  status: TransactionStatus;
  cardType?: string;
  terminal?: string;
}

export interface SourceSummary {
  source: TransactionSource;
  total: number;
  count: number;
  reconciled: number;
  pending: number;
  lost: number;
}

export interface ReconciliationResult {
  aditumTotal: number;
  bcodexTotal: number;
  semaeTotal: number;
  aditumToBcodexDiff: number;
  bcodexToSemaeDiff: number;
  totalDiff: number;
  lostTransactions: number;
}
