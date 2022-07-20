import { AfterViewInit, Component, NgZone, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ExpenditureService } from 'src/app/services/expenditure.service';
import { PostAuthenticateService } from 'src/app/services/ResultsService/post-authenticate-result.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ExpenseDialogComponent } from './expense-dialog/expense-dialog.component';
import { ExpenseDto } from 'src/app/models/ExpenseDto';
import { DataService } from 'src/app/services/data.service';
import { ClientDashboardDto } from 'src/app/models/ClientDashboardDto';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss'],
})
export class ClientDashboardComponent implements AfterViewInit {
  constructor(
    private dataService: DataService,
    private expenseService: ExpenditureService,
    private _dialog: MatDialog,
    private _snackbar: MatSnackBar,
    private ngZone: NgZone,
    private router: Router,
    private postAuthService: PostAuthenticateService
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['Description', 'Date', 'Total', 'Transactions'];
  totalSpendingToday = 0;
  totalSpendingThisYear = 0;
  totalSpendingThisMonth = 0;
  isLoading = true;

  dashboard_cards: ClientDashboardDto[] = [];

  dataSource = new MatTableDataSource<ExpenseDto>();

  sortData(sort: any) {
    if (!sort.active || sort.direction === '') {
      return;
    }

    this.dataSource.data = this.dataSource.data.slice().sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Description':
          return this.dataService.compare(a.description, b.description, isAsc);
        case 'Date':
          return this.dataService.compare(a.date, b.date, isAsc);
        case 'Total':
          return this.dataService.compare(a.total, b.total, isAsc);
        case 'Transactions':
          return this.dataService.compare(
            a.transaction.length,
            b.transaction.length,
            isAsc
          );
        default:
          return 0;
      }
    });
  }

  onTableRowClick(expense: ExpenseDto) {
    this._dialog.open(ExpenseDialogComponent, {
      width: '800px',
      data: expense,
      disableClose: true,
    });
  }

  getDashboardValues() {
    this.dataSource.data.forEach((x) => {
      // get today
      if (
        this.dataService.pipeDate(new Date()) ==
        this.dataService.pipeDate(x.date)
      ) {
        this.totalSpendingToday += x.total;
      }

      // get today
      if (
        this.dataService.pipeDateMonth(new Date()) ==
        this.dataService.pipeDateMonth(x.date)
      ) {
        this.totalSpendingThisMonth += x.total;
      }

      // get this year
      if (
        this.dataService.pipeDateYear(new Date()) ==
        this.dataService.pipeDateYear(x.date)
      ) {
        this.totalSpendingThisYear += x.total;
      }
    });
    this.dashboard_cards = [
      {
        title: 'Total Spending for this month:',
        value: this.totalSpendingThisMonth,
        bgColor: '#f1c40f',
      },
      {
        title: 'Total Spending for this year',
        value: this.totalSpendingThisYear,
        bgColor: '#fdcb6e',
      },
      {
        title: 'Total Spending for today:',
        value: this.totalSpendingToday,
        bgColor: '#fab1a0',
      },
    ];

    this.isLoading = false;
  }

  ngAfterViewInit(): void {
    this.expenseService.getExpenses().subscribe({
      next: (x) => {
        this.dataSource = new MatTableDataSource(x);
        this.dataSource.paginator = this.paginator;
        this.dataSource.data = x;
        this.ngZone.run(() => {
          this.getDashboardValues();
        });
      },
      error: () => {
        this._snackbar
          .open(
            'Unable to fetch expenses. Please click OK to sign in again!',
            'OK',
            {
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            }
          )
          .afterDismissed()
          .subscribe((x) => {
            localStorage.removeItem('token');
            this.router.navigateByUrl('/auth/authenticate');
            this.postAuthService.emitLoggedIn();
          });
      },
    });
  }
}
