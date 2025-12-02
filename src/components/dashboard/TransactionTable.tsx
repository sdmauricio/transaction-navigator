import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Transaction, TransactionSource, TransactionStatus } from "@/types/transaction";
import { cn } from "@/lib/utils";

interface TransactionTableProps {
  transactions: Transaction[];
  title?: string;
}

const statusConfig: Record<TransactionStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  reconciled: { label: 'Conciliada', variant: 'default' },
  pending: { label: 'Pendente', variant: 'secondary' },
  lost: { label: 'Perdida', variant: 'destructive' },
  deficit: { label: 'Déficit', variant: 'outline' },
};

const sourceLabels: Record<TransactionSource, string> = {
  aditum: 'Aditum',
  bcodex: 'Bcodex',
  semae: 'Semae',
};

export function TransactionTable({ transactions, title = "Transações Recentes" }: TransactionTableProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <Card className="glass animate-slide-up border-border/50" style={{ animationDelay: '400ms' }}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-muted-foreground">ID</TableHead>
                <TableHead className="text-muted-foreground">Fonte</TableHead>
                <TableHead className="text-muted-foreground">Referência</TableHead>
                <TableHead className="text-muted-foreground">Data</TableHead>
                <TableHead className="text-muted-foreground text-right">Valor</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow 
                  key={transaction.id} 
                  className={cn(
                    "border-border/30 hover:bg-card/50 transition-colors",
                    transaction.status === 'lost' && "bg-destructive/5"
                  )}
                >
                  <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                  <TableCell>
                    <span className={cn(
                      "text-sm font-medium",
                      transaction.source === 'aditum' && "text-primary",
                      transaction.source === 'bcodex' && "text-warning",
                      transaction.source === 'semae' && "text-success"
                    )}>
                      {sourceLabels[transaction.source]}
                    </span>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {transaction.reference}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(transaction.date)}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={statusConfig[transaction.status].variant}
                      className={cn(
                        transaction.status === 'reconciled' && "bg-success/20 text-success border-success/30",
                        transaction.status === 'pending' && "bg-warning/20 text-warning border-warning/30",
                        transaction.status === 'lost' && "bg-destructive/20 text-destructive border-destructive/30",
                        transaction.status === 'deficit' && "bg-primary/20 text-primary border-primary/30"
                      )}
                    >
                      {statusConfig[transaction.status].label}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
