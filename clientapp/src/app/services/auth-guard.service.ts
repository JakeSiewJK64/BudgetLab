import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { PostAuthenticateService } from './ResultsService/post-authenticate-result.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private postAuth: PostAuthenticateService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let jwtToken = localStorage.getItem('token');
    if (jwtToken == null || jwtToken == undefined || jwtToken.length == 0) {
      this.postAuth.emitLoggedIn();
      this.router.navigate(['/auth/authenticate']);
      return false;
    }
    return true;
  }
}
