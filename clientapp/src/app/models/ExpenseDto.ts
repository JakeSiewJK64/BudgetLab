import { TransactionDto } from './TransactionDto';

export interface ExpenseDto {
  id: number;
  description: string;
  date: Date;
  transaction: TransactionDto[];
}
