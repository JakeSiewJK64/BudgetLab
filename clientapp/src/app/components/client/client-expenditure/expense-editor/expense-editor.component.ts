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
    private _snackbar: MatSnackBar,
    private _cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: ExpenseDto
  ) {}

  subject: string = this.data != null ? this.data.description : '';

  ngAfterViewInit(): void {
    this._cdr.detectChanges();
  }

  closeDialog() {
    this._dialogRef.close();
  }

  save() {
    this._expenseService
      .saveExpenses(
        new ExpenseDto(
          this.data != null ? this.data.id : 0,
          this.subject,
          new Date()
        )
      )
      .subscribe({
        next: () => {
          this._dialogRef.close();
          this._snackbar.open('Successfully saved expenditure!', 'OK', {
            duration: 5000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });
        },
      });
  }
}
