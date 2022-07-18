import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationRequestDto } from 'src/app/models/AuthenticationRequestDto';
import { BugetLabServiceService } from 'src/app/services/buget-lab-service.service';
import { PostAuthenticateService } from 'src/app/services/ResultsService/post-authenticate-result.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  constructor(
    private budgetLabService: BugetLabServiceService,
    private router: Router,
    private postAuthEmitter: PostAuthenticateService
  ) {}

  isAuthenticated: Boolean = localStorage.getItem('token') == null;
  username: string = '';
  password: string = '';

  ngOnInit(): void {}

  onclick() {
    this.budgetLabService
      .authenticate(new AuthenticationRequestDto(this.username, this.password))
      .subscribe((x) => {
        localStorage.setItem('token', x.jwt.toString());
        this.postAuthEmitter.emitLoggedIn();
        if (x.jwt != null || x.jwt != '') {
          this.router.navigateByUrl('/client/dashboard');
        }
      });
  }
}
