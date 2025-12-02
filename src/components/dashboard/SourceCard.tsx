import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SourceSummary, TransactionSource } from "@/types/transaction";
import { CreditCard, RefreshCw, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SourceCardProps {
  summary: SourceSummary;
  delay?: number;
}

const sourceConfig: Record<TransactionSource, { label: string; icon: typeof CreditCard; gradient: string }> = {
  aditum: { label: 'Aditum', icon: CreditCard, gradient: 'from-primary/20 to-primary/5' },
  bcodex: { label: 'Bcodex', icon: RefreshCw, gradient: 'from-warning/20 to-warning/5' },
  semae: { label: 'Semae', icon: Building2, gradient: 'from-success/20 to-success/5' },
};

export function SourceCard({ summary, delay = 0 }: SourceCardProps) {
  const config = sourceConfig[summary.source];
  const Icon = config.icon;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <Card 
      className={cn(
        "glass animate-slide-up border-border/50 hover:border-primary/30 transition-all duration-300",
        `bg-gradient-to-br ${config.gradient}`
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {config.label}
        </CardTitle>
        <div className="p-2 rounded-lg bg-card/50">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground mb-4">
          {formatCurrency(summary.total)}
        </div>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-success" />
            <span className="text-muted-foreground">{summary.reconciled} conciliadas</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-warning" />
            <span className="text-muted-foreground">{summary.pending} pendentes</span>
          </div>
          {summary.lost > 0 && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-destructive" />
              <span className="text-muted-foreground">{summary.lost} perdidas</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
