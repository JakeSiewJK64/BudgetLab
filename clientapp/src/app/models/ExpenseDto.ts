import { TransactionDto } from './TransactionDto';

export interface ExpenseDto {
  id: number;
  description: string;
  date: Date;
  total: number;
  transaction: TransactionDto[];
}
