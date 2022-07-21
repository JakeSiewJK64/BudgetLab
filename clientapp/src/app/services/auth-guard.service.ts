import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PostAuthenticateService } from './ResultsService/post-authenticate-result.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(
    private router: Router,
    private postAuth: PostAuthenticateService
  ) {}

  canActivate(): boolean {
    let jwtToken = localStorage.getItem('token');
    if (jwtToken == null || jwtToken == undefined || jwtToken.length == 0) {
      this.postAuth.emitLoggedIn();
      this.router.navigate(['/auth/authenticate']);
      return false;
    }
    return true;
  }
}
