import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication-component/authentication.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthenticationComponent,
  },
  {
    path: 'authenticate',
    component: AuthenticationComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
];

export const authRouting = RouterModule.forChild(routes);
