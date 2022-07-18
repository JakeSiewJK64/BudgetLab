import { NgModule } from '@angular/core';
import { ClientRoutingModule } from './client-routing.module';
import { SharedModule } from 'src/app/shared.module';
import { ClientDashboardComponent } from './client-dashboard/client-dashboard.component';

@NgModule({
  declarations: [ClientDashboardComponent],
  imports: [SharedModule, ClientRoutingModule],
})
export class ClientModule {}
