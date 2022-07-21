export class TransactionDto {
  amount: number;
  id: number;
  expenseId: number;
  name: string;
  userid: number;

  constructor(
    name: string,
    amount: number,
    expenseId: number,
    id: number,
    userid: number
  ) {
    this.name = name;
    this.userid = userid;
    (this.id = id), (this.amount = amount);
    this.expenseId = expenseId;
  }
}
