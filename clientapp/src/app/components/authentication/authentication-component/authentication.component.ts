import { Component, OnInit } from '@angular/core';
import { AuthenticationRequestDto } from 'src/app/models/AuthenticationRequestDto';
import { BugetLabServiceService } from 'src/app/services/buget-lab-service.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  constructor(private budgetLabService: BugetLabServiceService) {}
  
  ngOnInit(): void {
  }

  username: string = '';
  password: string = '';

  onclick() {
    this.budgetLabService
      .authenticate(new AuthenticationRequestDto(this.username, this.password))
      .subscribe((x) => {
        console.log(x);
      });
  }
}
