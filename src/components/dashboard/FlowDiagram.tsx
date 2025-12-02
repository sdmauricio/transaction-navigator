import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CreditCard, RefreshCw, Building2 } from "lucide-react";
import { ReconciliationResult } from "@/types/transaction";
import { cn } from "@/lib/utils";

interface FlowDiagramProps {
  result: ReconciliationResult;
}

export function FlowDiagram({ result }: FlowDiagramProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <Card className="glass animate-slide-up border-border/50" style={{ animationDelay: '200ms' }}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Fluxo de Valores</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Aditum */}
          <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 min-w-[140px]">
            <div className="p-3 rounded-full bg-primary/20">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">Aditum</span>
            <span className="text-lg font-bold text-primary">
              {formatCurrency(result.aditumTotal)}
            </span>
          </div>

          {/* Arrow 1 */}
          <div className="flex flex-col items-center gap-1">
            <ArrowRight className="h-6 w-6 text-muted-foreground hidden md:block" />
            <div className="h-6 w-6 md:hidden rotate-90">
              <ArrowRight className="h-6 w-6 text-muted-foreground" />
            </div>
            <span className={cn(
              "text-xs font-medium",
              result.aditumToBcodexDiff > 0 ? "text-destructive" : "text-success"
            )}>
              {result.aditumToBcodexDiff > 0 ? '-' : ''}
              {formatCurrency(Math.abs(result.aditumToBcodexDiff))}
            </span>
          </div>

          {/* Bcodex */}
          <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-warning/20 to-warning/5 border border-warning/30 min-w-[140px]">
            <div className="p-3 rounded-full bg-warning/20">
              <RefreshCw className="h-6 w-6 text-warning" />
            </div>
            <span className="text-sm font-medium text-foreground">Bcodex</span>
            <span className="text-lg font-bold text-warning">
              {formatCurrency(result.bcodexTotal)}
            </span>
          </div>

          {/* Arrow 2 */}
          <div className="flex flex-col items-center gap-1">
            <ArrowRight className="h-6 w-6 text-muted-foreground hidden md:block" />
            <div className="h-6 w-6 md:hidden rotate-90">
              <ArrowRight className="h-6 w-6 text-muted-foreground" />
            </div>
            <span className={cn(
              "text-xs font-medium",
              result.bcodexToSemaeDiff > 0 ? "text-destructive" : "text-success"
            )}>
              {result.bcodexToSemaeDiff > 0 ? '-' : ''}
              {formatCurrency(Math.abs(result.bcodexToSemaeDiff))}
            </span>
          </div>

          {/* Semae */}
          <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-success/20 to-success/5 border border-success/30 min-w-[140px]">
            <div className="p-3 rounded-full bg-success/20">
              <Building2 className="h-6 w-6 text-success" />
            </div>
            <span className="text-sm font-medium text-foreground">Semae</span>
            <span className="text-lg font-bold text-success">
              {formatCurrency(result.semaeTotal)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
