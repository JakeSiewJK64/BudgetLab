import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionDto } from 'src/app/models/TransactionDto';
import { DataService } from 'src/app/services/data.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { TransactionEditorComponent } from './transaction-editor/transaction-editor.component';

@Component({
  selector: 'app-client-transaction',
  templateUrl: './client-transaction.component.html',
  styleUrls: ['./client-transaction.component.scss'],
})
export class ClientTransactionComponent implements AfterViewInit {
  constructor(
    private transactionService: TransactionService,
    private _dialogRef: MatDialog,
    private _dataService: DataService
  ) {}
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  dataSource = new MatTableDataSource<TransactionDto>();
  displayedColumns = ['name', 'amount'];

  onTableRowClick(row: any) {
    this._dialogRef
      .open(TransactionEditorComponent, {
        width: '800px',
        data: row,
        disableClose: true,
      })
      .afterClosed()
      .subscribe((x) => {
        this.getTransactions();
      });
  }

  promptEditor() {
    this._dialogRef
      .open(TransactionEditorComponent, {
        width: '800px',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((x) => {
        this.getTransactions();
      });
  }

  sortData(sort: any) {
    if (!sort.active || sort.direction === '') {
      return;
    }
    const isAsc = sort.direction === 'asc';
    this.dataSource.data = this.dataSource.data.slice().sort((a, b) => {
      switch (sort.active) {
        case 'name':
          return this._dataService.compare(a.name, b.name, isAsc);
        case 'amount':
          return this._dataService.compare(a.amount, b.amount, isAsc);
        default:
          return 0;
      }
    });
  }

  getTransactions() {
    this.transactionService.getTransactions().subscribe({
      next: (x) => {
        this.dataSource.data = x;
        this.dataSource.paginator = this.paginator;
      },
    });
  }

  ngAfterViewInit(): void {
    this.getTransactions();
  }
}
