export interface UserModel {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  role: string;
  joineddate: Date;
  profileimage: string | ArrayBuffer | null | undefined;
}
