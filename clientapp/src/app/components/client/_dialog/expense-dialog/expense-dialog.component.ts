import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExpenseDto } from 'src/app/models/ExpenseDto';
import { TransactionDto } from 'src/app/models/TransactionDto';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-expense-dialog',
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.scss'],
})
export class ExpenseDialogComponent implements AfterViewInit {
  displayedColumns = ['Name', 'Amount'];
  constructor(
    public _dialogRef: MatDialogRef<ExpenseDialogComponent>,
    private _dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: ExpenseDto
  ) {}
  @ViewChild(MatPaginator) public _paginator: MatPaginator;

  dataSource = new MatTableDataSource<TransactionDto>(this.data.transaction);

  sortData(sort: any) {
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.dataSource.data = this.dataSource.data.slice().sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'description':
          return this._dataService.compare(a.name, b.name, isAsc);
        case 'amount':
          return this._dataService.compare(a.amount, b.amount, isAsc);
        default:
          return 0;
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this._paginator;
  }

  closeDialog() {
    this._dialogRef.close();
  }
}
