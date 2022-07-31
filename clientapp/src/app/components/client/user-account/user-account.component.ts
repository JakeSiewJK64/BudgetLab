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
  constructor(private authService: AuthenticationService,
    private userService: UserService) { }

  user: UserModel;
  file: string | ArrayBuffer | null | undefined;

  save() {
    this.userService.upsertUsers(this.user).subscribe({
      next: (x) => {
        console.log(x);
      }
    })
  }

  triggerFileUpload() {
    let input = document.getElementById("file-profile")
    input?.click();
  }

  promptFileSelect(filesEvent: any) {
    const filereader = new FileReader();
    if (filesEvent.target.files[0]) {
      filereader.readAsDataURL(filesEvent.target.files[0]);
      filereader.onload = (x) => {
        this.file = x.target?.result;
        this.user.profileimage = this.file;
      }
    }
  }

  ngAfterViewInit(): void {
    this.authService.getUser().subscribe({
      next: (x: UserModel) => {
        this.user = x;
      },
    });
  }
}
