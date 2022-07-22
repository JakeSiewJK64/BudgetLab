import { AfterViewInit, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SignUpUserDto } from 'src/app/models/SignupUserDto';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PostAuthenticateService } from 'src/app/services/ResultsService/post-authenticate-result.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements AfterViewInit {
  username: string = '';
  password: string = '';
  firstname: string = '';
  lastname: string = '';
  jwt = localStorage.getItem('token');
  isProcessing = false;
  constructor(
    private _snackbar: MatSnackBar,
    private postAuthService: PostAuthenticateService,
    private budgetLabService: AuthenticationService,
    private router: Router
  ) {}
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
    this.isProcessing = true;
    this.budgetLabService
      .signUp(
        new SignUpUserDto(
          this.firstname,
          this.lastname,
          this.username,
          this.password,
        )
      )
      .subscribe({
        next: (x) => {
          this.isProcessing = false;
          localStorage.setItem('token', x.jwt.toString());
          if (x.jwt != null || x.jwt != '') {
            this.postAuthService.emitLoggedIn();
            this.router.navigateByUrl('/client/dashboard');
          }
        },
        error: () => {
          this.isProcessing = false;
          this._snackbar.open(
            'Either your password or username is incorrect. Please sign in again!',
            'OK',
            {
              duration: 5000,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            }
          );
        },
      });
  }
}
