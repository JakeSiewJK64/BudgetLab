import { NgModule } from '@angular/core';
import { AuthenticationComponent } from './authentication-component/authentication.component';
import { SharedModule } from 'src/app/shared.module';
import { authRouting } from './authentication-routing.module';

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [SharedModule, authRouting],
})
export class AuthenticationModule {}
