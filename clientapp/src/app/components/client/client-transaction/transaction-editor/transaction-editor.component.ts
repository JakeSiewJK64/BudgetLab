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
    @Inject(MAT_DIALOG_DATA) public data: TransactionDto
  ) {}
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
          this.data == null ? 0 : this.data.id
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

  ngAfterViewInit(): void {
    this.data;
    if (this.data != null) {
      this.subject = this.data.name;
      this.amount = this.data.amount;
      this.selected = this.data.expenseId;
    }
    this._expenseService.getExpenses().subscribe((x) => {
      this.expensesList = x;
    });
    this._cdr.detectChanges();
  }
}
