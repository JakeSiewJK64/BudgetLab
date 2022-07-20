import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { ClientExpenditureComponent } from './client-expenditure/client-expenditure.component';
import { ClientTransactionComponent } from './client-transaction/client-transaction.component';

const routes: Routes = [
  { path: 'dashboard', component: ClientDashboardComponent },
  { path: 'transaction', component: ClientTransactionComponent },
  { path: 'expenditure', component: ClientExpenditureComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ClientRoutingModule {}
