import { DialogRef } from '@angular/cdk/dialog';
import { AfterViewInit, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpenseDto } from 'src/app/models/ExpenseDto';
import { ExpenditureService } from 'src/app/services/expenditure.service';

@Component({
  selector: 'app-expense-editor',
  templateUrl: './expense-editor.component.html',
  styleUrls: ['./expense-editor.component.scss'],
})
export class ExpenseEditorComponent implements AfterViewInit {
  constructor(
    private _dialogRef: DialogRef,
    private _expenseService: ExpenditureService,
    private _snackbar: MatSnackBar
  ) {}

  subject: string;

  ngAfterViewInit(): void {}

  closeDialog() {
    this._dialogRef.close();
  }

  save() {
    this._expenseService
      .saveExpenses(new ExpenseDto(this.subject, new Date()))
      .subscribe({
        next: () => {
          this._snackbar.open('Successfully saved expenditure!', 'OK');
        },
      });
    this._dialogRef.close();
  }
}
