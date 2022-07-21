import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { ClientExpenditureComponent } from './client-expenditure/client-expenditure.component';
import { ClientTransactionComponent } from './client-transaction/client-transaction.component';
import { UserAccountComponent } from './user-account/user-account.component';

const routes: Routes = [
  { path: 'dashboard', component: ClientDashboardComponent },
  { path: 'transaction', component: ClientTransactionComponent },
  { path: 'expenditure', component: ClientExpenditureComponent },
  { path: 'account', component: UserAccountComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ClientRoutingModule {}
