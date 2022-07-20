import { TransactionDto } from './TransactionDto';

export class ExpenseDto {
  id: number;
  description: string;
  date: Date;
  total: number;
  transaction: TransactionDto[];

  constructor(id: number, description: string, date: Date) {
    (this.description = description), (this.date = date), (this.id = id);
  }
}
