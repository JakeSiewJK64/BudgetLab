import { TransactionDto } from './TransactionDto';

export class ExpenseDto {
  id: number;
  description: string;
  date: Date;
  total: number;
  userid: number;
  transaction: TransactionDto[];

  constructor(id: number, description: string, date: Date, userid: number) {
    (this.description = description),
      (this.date = date),
      (this.id = id),
      (this.userid = userid);
  }
}
