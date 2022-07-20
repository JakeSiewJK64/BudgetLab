import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ExpenditureService } from 'src/app/services/expenditure.service';
import { PostAuthenticateService } from 'src/app/services/ResultsService/post-authenticate-result.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ExpenseDialogComponent } from '../_dialog/expense-dialog/expense-dialog.component';
import { ExpenseDto } from 'src/app/models/ExpenseDto';
import { DataService } from 'src/app/services/data.service';

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
    private router: Router,
    private postAuthService: PostAuthenticateService
  ) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['Description', 'Date', 'Total'];

  dashboard_cards = [
    {
      title: 'Total Spending for this month:',
      value: 980,
      bgColor: '#f1c40f',
    },
    {
      title: 'Total Spending for this week',
      value: 980,
      bgColor: '#fdcb6e',
    },
    {
      title: 'Total Spending for today:',
      value: 980,
      bgColor: '#fab1a0',
    },
  ];

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

  ngAfterViewInit(): void {
    if (localStorage.getItem('token') != null) {
      this.expenseService.getExpenses().subscribe({
        next: (x) => {
          this.dataSource = new MatTableDataSource(x);
          this.dataSource.paginator = this.paginator;
          this.dataSource.data = x;
        },
        error: () => {
          this._snackbar
            .open(
              'Unable to fetch expenses. Please click OK to sign in again!',
              'OK',
              {
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
}
