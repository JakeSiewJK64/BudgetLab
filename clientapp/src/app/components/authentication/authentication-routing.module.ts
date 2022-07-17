import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication-component/authentication.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthenticationComponent,
  },
  {
    path: 'authenticate',
    component: AuthenticationComponent,
  },
];

export const authRouting = RouterModule.forChild(routes);
