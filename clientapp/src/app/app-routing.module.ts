import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindashboardComponent } from './components/admin/admindashboard/admindashboard.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

export const routes: Routes = [
  {
    path: 'admin',
    component: AdmindashboardComponent,
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
