export interface User {
  username: string;
  password: string;
  token?: string;
  elo?: number;
  id: number;
}
