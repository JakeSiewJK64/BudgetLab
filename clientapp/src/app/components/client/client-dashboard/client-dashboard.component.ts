import { AfterViewInit, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ExpenseDto } from 'src/app/models/ExpenseDto';
import { ExpenditureService } from 'src/app/services/expenditure.service';
import { PostAuthenticateService } from 'src/app/services/ResultsService/post-authenticate-result.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss'],
})
export class ClientDashboardComponent implements AfterViewInit {
  constructor(
    private expenseService: ExpenditureService,
    private _snackbar: MatSnackBar,
    private router: Router,
    private postAuthService: PostAuthenticateService
  ) {}

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

  expenses: ExpenseDto[] = [];

  ngAfterViewInit(): void {
    if (localStorage.getItem('token') != null) {
      this.expenseService.getExpenses().subscribe({
        next: (x) => {
          this.expenses = x;
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
