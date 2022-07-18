import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostAuthenticateService } from './services/ResultsService/post-authenticate-result.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  isAuthenticated: Boolean = localStorage.getItem('token') != null;

  constructor(private router: Router, private auth: PostAuthenticateService) {}
  ngAfterViewInit(): void {
    this.auth.getLoggedIn().subscribe((x) => {
      this.isAuthenticated = x;
    });
  }

  redirectToAuth() {
    this.router.navigateByUrl('/auth/authenticate');
  }
}
