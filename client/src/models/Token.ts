class Token {
  public token: string;
  public username: string;
  public password: string;
  public id: number;
  constructor(token: string, username: string, password: string, id: number) {
    this.token = token;
    this.username = username;
    this.password = password;
    this.id = id;
  }
}
