import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExpenseDto } from 'src/app/models/ExpenseDto';

@Component({
  selector: 'app-expense-dialog',
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.scss'],
})
export class ExpenseDialogComponent implements AfterViewInit {
  displayedColumns = ['Name', 'Amount'];
  constructor(
    public _dialogRef: MatDialogRef<ExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExpenseDto
  ) {}
  @ViewChild(MatPaginator) public _paginator: MatPaginator;

  dataSource = new MatTableDataSource(this.data.transaction);
  ngAfterViewInit(): void {
    this.dataSource.paginator = this._paginator;
  }

  closeDialog() {
    this._dialogRef.close();
  }
}
