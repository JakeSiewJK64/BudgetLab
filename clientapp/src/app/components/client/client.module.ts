import { NgModule } from '@angular/core';
import { ClientRoutingModule } from './client-routing.module';
import { SharedModule } from 'src/app/shared.module';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { ExpenseDialogComponent } from './_dialog/expense-dialog/expense-dialog.component';
import { ClientTransactionComponent } from './client-transaction/client-transaction.component';

@NgModule({
  declarations: [ClientDashboardComponent, ExpenseDialogComponent, ClientTransactionComponent],
  imports: [SharedModule, ClientRoutingModule],
})
export class ClientModule {}
