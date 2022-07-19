import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { PostAuthenticateService } from './services/ResultsService/post-authenticate-result.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  isAuthenticated: Boolean = localStorage.getItem('token') != null;
  redirectRoute: string = '/auth/authenticate';

  routes = [
    {
      path: '',
      name: 'Account',
      icon: 'person',
    },
    {
      path: '',
      name: 'My Expenditure',
      icon: 'money',
    },
    {
      path: '',
      name: 'Create Entity',
      icon: 'groups',
    },
    {
      path: '',
      name: 'Settings',
      icon: 'settings',
    },
  ];

  @ViewChild('sidenav') sidenav: MatSidenav;
  constructor(
    private router: Router,
    private auth: PostAuthenticateService,
    private postAuth: PostAuthenticateService
  ) {}

  toggleSideNav() {
    this.sidenav.toggle();
  }

  logout() {
    localStorage.removeItem('token');
    this.redirectToAuth();
    this.postAuth.emitLoggedIn();
  }

  ngAfterViewInit(): void {
    this.auth.getLoggedIn().subscribe((x) => {
      this.isAuthenticated = x;
    });
  }

  redirectToAuth() {
    this.router.navigateByUrl(this.redirectRoute);
  }
}
