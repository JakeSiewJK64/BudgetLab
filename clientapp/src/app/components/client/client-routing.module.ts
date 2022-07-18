import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: ClientDashboardComponent },
];

@NgModule({
  declarations: [ClientDashboardComponent],
  imports: [RouterModule.forChild(routes)],
})
export class ClientRoutingModule {}
