export class SignUpUserDto {
  firstName: string;
  lastName: string;
  password: string;
  username: string;
  constructor(
    firstName: string,
    lastName: string,
    username: string,
    password: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
  }
}
