import { DialogRef } from '@angular/cdk/dialog';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpenseDto } from 'src/app/models/ExpenseDto';
import { TransactionDto } from 'src/app/models/TransactionDto';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ExpenditureService } from 'src/app/services/expenditure.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction-editor',
  templateUrl: './transaction-editor.component.html',
  styleUrls: ['./transaction-editor.component.scss'],
})
export class TransactionEditorComponent implements AfterViewInit {
  constructor(
    private _cdr: ChangeDetectorRef,
    private _dialogRef: DialogRef,
    private _transactionService: TransactionService,
    private _snackbar: MatSnackBar,
    private _expenseService: ExpenditureService,
    private authService: AuthenticationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  userid: number = 0;
  expensesList: Array<ExpenseDto> = [];
  subject: string;
  amount: number;
  selected: number;

  save() {
    this._transactionService
      .upsertTransaction(
        new TransactionDto(
          this.subject,
          this.amount,
          this.selected,
          this.data.row == null ? 0 : this.data.row.id,
          this.data.userid ? this.data.userid : this.data.useridorigin
        )
      )
      .subscribe({
        next: () => {
          this._dialogRef.close();
          this._snackbar.open(
            `Successfully ${
              this.data == null ? 'added' : 'updated'
            } transaction!`,
            'OK',
            {
              duration: 5000,
              verticalPosition: 'bottom',
              horizontalPosition: 'end',
            }
          );
        },
        error: (err) => {
          this._snackbar.open(err.message, 'OK', {
            duration: 5000,
            verticalPosition: 'bottom',
            horizontalPosition: 'end',
          });
        },
      });
  }

  closeDialog() {
    this._dialogRef.close();
  }

  getExpense(userid: number) {
    this._expenseService.getExpenseByUserId(userid).subscribe((x) => {
      this.expensesList = x;
    });
  }

  getUserId() {
    this.authService.getUser().subscribe({
      next: (x: any) => {
        this.userid = x.userid;
        this.getExpense(this.userid);
      },
    });
  }

  ngAfterViewInit(): void {
    if (this.data.row != null) {
      this.subject = this.data.row.name;
      this.amount = this.data.row.amount;
      this.selected = this.data.row.expenseId;
    }
    this.getUserId();
    this._cdr.detectChanges();
  }
}
