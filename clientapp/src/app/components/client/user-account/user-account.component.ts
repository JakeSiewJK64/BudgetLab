import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/UserModel';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
})
export class UserAccountComponent implements AfterViewInit {
  constructor(private authService: AuthenticationService) {}

  user: UserModel;

  ngAfterViewInit(): void {
    this.authService.getUser().subscribe({
      next: (x: UserModel) => {
        this.user = x;
      },
    });
  }
}
