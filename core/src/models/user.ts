export interface UserRecord {
  id: number;
  email: string;
  password: string;
}

export class User {
  public id: number;
  public email: string;
  public password: string;

  constructor(data: UserRecord) {
    this.id = data.id;
    this.email = data.email;
    this.password = data.password;
  }
}
