import { Transaction, SourceSummary, ReconciliationResult } from '@/types/transaction';

// Mock data simulating transactions from each source
export const mockTransactions: Transaction[] = [
  { id: 'ADT001', source: 'aditum', amount: 1250.00, date: '2024-01-15', reference: 'CARD-001', status: 'reconciled', cardType: 'Crédito', terminal: 'T001' },
  { id: 'ADT002', source: 'aditum', amount: 890.50, date: '2024-01-15', reference: 'CARD-002', status: 'reconciled', cardType: 'Débito', terminal: 'T001' },
  { id: 'ADT003', source: 'aditum', amount: 2340.00, date: '2024-01-15', reference: 'CARD-003', status: 'pending', cardType: 'Crédito', terminal: 'T002' },
  { id: 'ADT004', source: 'aditum', amount: 567.80, date: '2024-01-14', reference: 'CARD-004', status: 'lost', cardType: 'Débito', terminal: 'T001' },
  { id: 'ADT005', source: 'aditum', amount: 3200.00, date: '2024-01-14', reference: 'CARD-005', status: 'reconciled', cardType: 'Crédito', terminal: 'T003' },
  { id: 'ADT006', source: 'aditum', amount: 1100.00, date: '2024-01-14', reference: 'CARD-006', status: 'reconciled', cardType: 'Crédito', terminal: 'T002' },
  { id: 'ADT007', source: 'aditum', amount: 450.25, date: '2024-01-13', reference: 'CARD-007', status: 'pending', cardType: 'Débito', terminal: 'T001' },
  { id: 'ADT008', source: 'aditum', amount: 1890.00, date: '2024-01-13', reference: 'CARD-008', status: 'reconciled', cardType: 'Crédito', terminal: 'T003' },
  
  { id: 'BCX001', source: 'bcodex', amount: 1250.00, date: '2024-01-15', reference: 'CARD-001', status: 'reconciled' },
  { id: 'BCX002', source: 'bcodex', amount: 890.50, date: '2024-01-15', reference: 'CARD-002', status: 'reconciled' },
  { id: 'BCX003', source: 'bcodex', amount: 3200.00, date: '2024-01-14', reference: 'CARD-005', status: 'reconciled' },
  { id: 'BCX004', source: 'bcodex', amount: 1100.00, date: '2024-01-14', reference: 'CARD-006', status: 'reconciled' },
  { id: 'BCX005', source: 'bcodex', amount: 1890.00, date: '2024-01-13', reference: 'CARD-008', status: 'reconciled' },
  { id: 'BCX006', source: 'bcodex', amount: 750.00, date: '2024-01-13', reference: 'CARD-009', status: 'deficit' },
  
  { id: 'SEM001', source: 'semae', amount: 1250.00, date: '2024-01-15', reference: 'CARD-001', status: 'reconciled' },
  { id: 'SEM002', source: 'semae', amount: 890.50, date: '2024-01-15', reference: 'CARD-002', status: 'reconciled' },
  { id: 'SEM003', source: 'semae', amount: 3200.00, date: '2024-01-14', reference: 'CARD-005', status: 'reconciled' },
  { id: 'SEM004', source: 'semae', amount: 1100.00, date: '2024-01-14', reference: 'CARD-006', status: 'reconciled' },
  { id: 'SEM005', source: 'semae', amount: 1890.00, date: '2024-01-13', reference: 'CARD-008', status: 'reconciled' },
];

export const getSourceSummary = (source: Transaction['source']): SourceSummary => {
  const transactions = mockTransactions.filter(t => t.source === source);
  return {
    source,
    total: transactions.reduce((acc, t) => acc + t.amount, 0),
    count: transactions.length,
    reconciled: transactions.filter(t => t.status === 'reconciled').length,
    pending: transactions.filter(t => t.status === 'pending').length,
    lost: transactions.filter(t => t.status === 'lost').length,
  };
};

export const getReconciliationResult = (): ReconciliationResult => {
  const aditum = getSourceSummary('aditum');
  const bcodex = getSourceSummary('bcodex');
  const semae = getSourceSummary('semae');

  return {
    aditumTotal: aditum.total,
    bcodexTotal: bcodex.total,
    semaeTotal: semae.total,
    aditumToBcodexDiff: aditum.total - bcodex.total,
    bcodexToSemaeDiff: bcodex.total - semae.total,
    totalDiff: aditum.total - semae.total,
    lostTransactions: mockTransactions.filter(t => t.status === 'lost').length,
  };
};
