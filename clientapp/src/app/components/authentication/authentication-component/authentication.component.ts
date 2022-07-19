import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationRequestDto } from 'src/app/models/AuthenticationRequestDto';
import { BugetLabServiceService } from 'src/app/services/buget-lab.service';
import { PostAuthenticateService } from 'src/app/services/ResultsService/post-authenticate-result.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements AfterViewInit {
  constructor(
    private budgetLabService: BugetLabServiceService,
    private router: Router,
    private postAuthService: PostAuthenticateService,
    private _snackbar: MatSnackBar
  ) {}

  username: string = '';
  password: string = '';

  jwt = localStorage.getItem('token');
  ngAfterViewInit(): void {
    if (this.jwt != null) {
      this.budgetLabService
        .validateExpiry(this.jwt != null ? this.jwt : '')
        .subscribe((x) => {
          if (!x) {
            this.router.navigateByUrl('/client/dashboard');
          }
        });
    }
  }

  onclick() {
    this.budgetLabService
      .authenticate(new AuthenticationRequestDto(this.username, this.password))
      .subscribe({
        next: (x) => {
          localStorage.setItem('token', x.jwt.toString());
          if (x.jwt != null || x.jwt != '') {
            this.postAuthService.emitLoggedIn();
            this.router.navigateByUrl('/client/dashboard');
          }
        },
        error: () => {
          this._snackbar.open(
            'Either your password or username is incorrect. Please sign in again!',
            'OK',
            {
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            }
          );
        },
      });
  }
}
