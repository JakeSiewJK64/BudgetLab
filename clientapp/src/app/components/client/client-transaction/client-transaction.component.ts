import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionDto } from 'src/app/models/TransactionDto';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { AlertdialogComponent } from '../../shared/alertdialog/alertdialog.component';
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
    private authService: AuthenticationService,
    private _dataService: DataService,
    private _matDialog: MatDialog,
    private _snackbar: MatSnackBar,
    private datePipe: DatePipe,
  ) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<TransactionDto>();
  displayedColumns = ['name', 'amount', 'action'];
  userid: number = 0;

  exportTransactionCSV() {
    this.transactionService.exportTransactionCSV(this.userid).subscribe({
      next: x => {
        var filename: string = `Transaction_${this.datePipe.transform(new Date(), 'yyyy-MM-dd')}.csv`;
        this._dataService.downloadManager(filename, x);
      }
    })
  }

  onTableRowClick(row: any) {
    this._dialogRef
      .open(TransactionEditorComponent, {
        width: '800px',
        data: {
          row: row,
          useridorigin: this.userid,
        },
        disableClose: true,
      })
      .afterClosed()
      .subscribe((x) => {
        this.getTransactions(this.userid);
      });
  }

  deleteTransaction(id: number) {
    this._matDialog
      .open(AlertdialogComponent, {
        data: {
          title: 'Delete transaction?',
          message: 'Do you want to delete this transaction?',
        },
      })
      .afterClosed()
      .subscribe({
        next: (x) => {
          if (x == 'confirm') {
            this.transactionService.deleteTransaction(id).subscribe({
              next: (y) => {
                this._snackbar.open('Successfully deleted transaction!', 'OK', {
                  duration: 5000,
                  horizontalPosition: 'end',
                  verticalPosition: 'bottom',
                });
              },
              error: (err) => {
                this._snackbar.open('Something went wrong!', 'OK', {
                  duration: 5000,
                  horizontalPosition: 'end',
                  verticalPosition: 'bottom',
                });
              },
              complete: () => {
                this.getTransactions(this.userid);
              },
            });
          }
        },
      });
  }

  promptEditor() {
    this._dialogRef
      .open(TransactionEditorComponent, {
        width: '800px',
        disableClose: true,
        data: {
          useridorigin: this.userid,
        },
      })
      .afterClosed()
      .subscribe((_) => {
        this.getTransactions(this.userid);
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

  getTransactions(userid: number) {
    this.transactionService.getTransactionsByUserId(userid).subscribe((x) => {
      this.dataSource.data = x;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {
    this.authService.getUser().subscribe({
      next: (x: any) => {
        this.userid = x.userid;
        this.getTransactions(this.userid);
      },
    });
  }
}
