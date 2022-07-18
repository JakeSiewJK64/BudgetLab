import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./components/authentication/authentication.module').then(
        (x) => x.AuthenticationModule
      ),
  },
  {
    path: 'client',
    loadChildren: () =>
      import('./components/client/client.module').then((x) => x.ClientModule),
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
