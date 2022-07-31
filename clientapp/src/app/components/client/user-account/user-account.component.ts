import { AfterViewInit, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserModel } from 'src/app/models/UserModel';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { AlertdialogComponent } from '../../shared/alertdialog/alertdialog.component';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
})
export class UserAccountComponent implements AfterViewInit {
  constructor(
    private authService: AuthenticationService,
    private customDialog: MatDialog,
    private userService: UserService) { }

  user: UserModel;
  file: string | ArrayBuffer | null | undefined;

  save() {
    this.customDialog.open(AlertdialogComponent, {
      data: {
        title: "Update Profile",
        message: "Are you sure you want to update your profile? Updating means logging out of your account to apply the changes you made, especially your username."
      }
    }).afterClosed().subscribe({
      next: x => {
        if (x == 'confirm') {
          this.userService.upsertUsers(this.user).subscribe({
            next: (res) => {
              console.log(res);
            }
          })
        }
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
