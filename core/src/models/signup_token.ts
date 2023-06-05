export interface SignupTokenRecord {
  id: number;
  email: string;
  token: string;
  expirationAt: string;
}

/**
 * A data structure for holding Signup token information.
 */
export class SignupToken {
  public id: number;
  public email: string;
  public token: string;
  public expirationAt: string;

  constructor(data: SignupTokenRecord) {
    this.id = data.id;
    this.email = data.email;
    this.token = data.token;
    this.expirationAt = data.expirationAt;
  }
}
