import { Header } from "@/components/dashboard/Header";
import { SourceCard } from "@/components/dashboard/SourceCard";
import { FlowDiagram } from "@/components/dashboard/FlowDiagram";
import { ReconciliationCard } from "@/components/dashboard/ReconciliationCard";
import { TransactionTable } from "@/components/dashboard/TransactionTable";
import { 
  mockTransactions, 
  getSourceSummary, 
  getReconciliationResult 
} from "@/data/mockTransactions";

const Index = () => {
  const aditumSummary = getSourceSummary('aditum');
  const bcodexSummary = getSourceSummary('bcodex');
  const semaeSummary = getSourceSummary('semae');
  const reconciliationResult = getReconciliationResult();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />

        {/* Source Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <SourceCard summary={aditumSummary} delay={0} />
          <SourceCard summary={bcodexSummary} delay={100} />
          <SourceCard summary={semaeSummary} delay={200} />
        </div>

        {/* Flow Diagram */}
        <div className="mb-6">
          <FlowDiagram result={reconciliationResult} />
        </div>

        {/* Reconciliation Result */}
        <div className="mb-6">
          <ReconciliationCard result={reconciliationResult} />
        </div>

        {/* Transaction Table */}
        <TransactionTable transactions={mockTransactions} />
      </div>
    </div>
  );
};

export default Index;
