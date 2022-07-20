export class TransactionDto {
  amount: number;
  id: number;
  expenseId: number;
  name: string;

  constructor(name: string, amount: number) {
    this.name = name;
    this.amount = amount;
  }
}
