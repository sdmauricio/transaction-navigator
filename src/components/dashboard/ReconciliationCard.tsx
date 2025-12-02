import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReconciliationResult } from "@/types/transaction";
import { AlertTriangle, TrendingDown, TrendingUp, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReconciliationCardProps {
  result: ReconciliationResult;
}

export function ReconciliationCard({ result }: ReconciliationCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const hasDeficit = result.totalDiff > 0;
  const hasSurplus = result.totalDiff < 0;

  return (
    <Card className="glass animate-slide-up border-border/50" style={{ animationDelay: '300ms' }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <AlertTriangle className={cn(
            "h-5 w-5",
            hasDeficit ? "text-destructive" : hasSurplus ? "text-warning" : "text-success"
          )} />
          Resultado da Reconciliação
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Aditum -> Bcodex */}
          <div className="p-4 rounded-lg bg-card/50 border border-border/50">
            <p className="text-xs text-muted-foreground mb-1">Aditum → Bcodex</p>
            <div className="flex items-center gap-2">
              {result.aditumToBcodexDiff > 0 ? (
                <TrendingDown className="h-4 w-4 text-destructive" />
              ) : result.aditumToBcodexDiff < 0 ? (
                <TrendingUp className="h-4 w-4 text-warning" />
              ) : (
                <CheckCircle className="h-4 w-4 text-success" />
              )}
              <span className={cn(
                "font-semibold",
                result.aditumToBcodexDiff > 0 ? "text-destructive" : 
                result.aditumToBcodexDiff < 0 ? "text-warning" : "text-success"
              )}>
                {formatCurrency(Math.abs(result.aditumToBcodexDiff))}
              </span>
            </div>
          </div>

          {/* Bcodex -> Semae */}
          <div className="p-4 rounded-lg bg-card/50 border border-border/50">
            <p className="text-xs text-muted-foreground mb-1">Bcodex → Semae</p>
            <div className="flex items-center gap-2">
              {result.bcodexToSemaeDiff > 0 ? (
                <TrendingDown className="h-4 w-4 text-destructive" />
              ) : result.bcodexToSemaeDiff < 0 ? (
                <TrendingUp className="h-4 w-4 text-warning" />
              ) : (
                <CheckCircle className="h-4 w-4 text-success" />
              )}
              <span className={cn(
                "font-semibold",
                result.bcodexToSemaeDiff > 0 ? "text-destructive" : 
                result.bcodexToSemaeDiff < 0 ? "text-warning" : "text-success"
              )}>
                {formatCurrency(Math.abs(result.bcodexToSemaeDiff))}
              </span>
            </div>
          </div>

          {/* Total Difference */}
          <div className={cn(
            "p-4 rounded-lg border",
            hasDeficit ? "bg-destructive/10 border-destructive/30" :
            hasSurplus ? "bg-warning/10 border-warning/30" :
            "bg-success/10 border-success/30"
          )}>
            <p className="text-xs text-muted-foreground mb-1">Diferença Total</p>
            <div className="flex items-center gap-2">
              {hasDeficit ? (
                <TrendingDown className="h-4 w-4 text-destructive" />
              ) : hasSurplus ? (
                <TrendingUp className="h-4 w-4 text-warning" />
              ) : (
                <CheckCircle className="h-4 w-4 text-success" />
              )}
              <span className={cn(
                "font-bold text-lg",
                hasDeficit ? "text-destructive" : hasSurplus ? "text-warning" : "text-success"
              )}>
                {formatCurrency(Math.abs(result.totalDiff))}
              </span>
            </div>
          </div>
        </div>

        {result.lostTransactions > 0 && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <span className="text-sm">
              <strong className="text-destructive">{result.lostTransactions}</strong> transação(ões) perdida(s) identificada(s)
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
