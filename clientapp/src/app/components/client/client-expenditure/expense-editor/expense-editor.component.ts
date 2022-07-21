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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  subject: string = this.data.row != null ? this.data.row.description : '';

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
          this.data.row != null ? this.data.row.id : 0,
          this.subject,
          new Date(),
          this.data.userid != null ? this.data.userid : this.data.useridorigin
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
