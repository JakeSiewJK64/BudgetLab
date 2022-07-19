import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-client-transaction',
  templateUrl: './client-transaction.component.html',
  styleUrls: ['./client-transaction.component.scss'],
})
export class ClientTransactionComponent implements AfterViewInit {
  constructor(private transactionService: TransactionService) {}
  dataSource = new MatTableDataSource();
  displayedColumns = ['Name', 'Amount'];

  onTableRowClick(row: any) {}

  ngAfterViewInit(): void {
    this.transactionService.getTransactions().subscribe({
      next: (x) => {
        this.dataSource.data = x;
      },
    });
  }
}
