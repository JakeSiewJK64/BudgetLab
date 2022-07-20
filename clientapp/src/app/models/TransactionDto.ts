export class TransactionDto {
  amount: number;
  id: number;
  expenseId: number;
  name: string;

  constructor(name: string, amount: number, expenseId: number, id: number) {
    this.name = name;
    (this.id = id), (this.amount = amount);
    this.expenseId = expenseId;
  }
}
