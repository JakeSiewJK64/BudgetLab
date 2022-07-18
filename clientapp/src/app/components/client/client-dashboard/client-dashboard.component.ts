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

  expenses: ExpenseDto[] = [];

  ngAfterViewInit(): void {
    this.expenseService.getExpenses().subscribe((x) => {
      this.expenses = x;
      console.log(this.expenses);
    });
  }
}
