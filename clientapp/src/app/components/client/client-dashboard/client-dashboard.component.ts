import { AfterViewInit, Component } from '@angular/core';
import { ExpenseDto } from 'src/app/models/ExpenseDto';
import { ExpenditureService } from 'src/app/services/expenditure.service';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.scss'],
})
export class ClientDashboardComponent implements AfterViewInit {
  constructor(private expenseService: ExpenditureService) {}

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
    this.expenseService.getExpenses().subscribe((x) => {
      this.expenses = x;
      console.log(this.expenses);
    });
  }
}
