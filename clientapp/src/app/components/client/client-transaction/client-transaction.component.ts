import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionDto } from 'src/app/models/TransactionDto';
import { DataService } from 'src/app/services/data.service';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-client-transaction',
  templateUrl: './client-transaction.component.html',
  styleUrls: ['./client-transaction.component.scss'],
})
export class ClientTransactionComponent implements AfterViewInit {
  constructor(
    private transactionService: TransactionService,
    private _dataService: DataService
  ) {}
  dataSource = new MatTableDataSource<TransactionDto>();
  displayedColumns = ['name', 'amount'];

  onTableRowClick(row: any) {}

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

  ngAfterViewInit(): void {
    this.transactionService.getTransactions().subscribe({
      next: (x) => {
        this.dataSource.data = x;
      },
    });
  }
}
