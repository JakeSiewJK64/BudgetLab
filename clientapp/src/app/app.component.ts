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
  username: string = '';
  routes = [
    {
      path: '/client/dashboard',
      name: 'Dashboard',
      icon: 'home',
    },
    {
      path: '/client/account',
      name: 'Account',
      icon: 'person',
    },
    {
      path: '/client/expenditure',
      name: 'My Expenditure',
      icon: 'money',
    },
    {
      path: '/client/transaction',
      name: 'My Transactions',
      icon: 'receipt_long',
    },
    {
      path: '/client/entity',
      name: 'Create Entity',
      icon: 'groups',
    },
    {
      path: '/client/settings',
      name: 'Settings',
      icon: 'settings',
    },
  ];

  @ViewChild('sidenav') sidenav: MatSidenav;
  constructor(
    private router: Router,
    private postAuth: PostAuthenticateService
  ) {}

  onClickRoute(routePath: string) {
    this.router.navigateByUrl(routePath);
  }

  toggleSideNav() {
    this.sidenav.toggle();
  }

  logout() {
    localStorage.removeItem('token');
    this.redirectToAuth();
    this.postAuth.emitLoggedIn();
  }

  checkAuthentication() {
    this.postAuth.getLoggedIn().subscribe((x) => {
      this.isAuthenticated = x;
    });
  }

  ngAfterViewInit(): void {
    this.checkAuthentication();
    this.postAuth.getUserCallingCard().subscribe((x) => {
      this.username = x;
    });
  }

  redirectToAuth() {
    this.router.navigateByUrl(this.redirectRoute);
  }
}
