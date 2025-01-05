export interface User {
  username: string;
  password: string;
  token?: string;
  elo?: number;
  id: number;
}

export interface UserRank {
  id: number;
  username: string;
  elo: number;
}

export interface UserReplay {
  username: string;
  id: number;
}

