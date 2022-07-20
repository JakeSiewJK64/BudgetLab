import { NgModule } from '@angular/core';
import { ClientRoutingModule } from './client-routing.module';
import { SharedModule } from 'src/app/shared.module';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';
import { ExpenseDialogComponent } from './_dialog/expense-dialog/expense-dialog.component';
import { ClientTransactionComponent } from './client-transaction/client-transaction.component';
import { ClientExpenditureComponent } from './client-expenditure/client-expenditure.component';
import { ExpenseEditorComponent } from './client-expenditure/expense-editor/expense-editor.component';

@NgModule({
  declarations: [
    ClientDashboardComponent,
    ExpenseDialogComponent,
    ClientTransactionComponent,
    ClientExpenditureComponent,
    ExpenseEditorComponent,
  ],
  imports: [SharedModule, ClientRoutingModule],
})
export class ClientModule {}
