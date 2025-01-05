export interface UserInputDTO {
  username: string;
  password: string;
}

export interface UserInputPatchDTO {
  username?: string;
  password?: string;
}

export interface UserOutputDTO {
  id: number;
  username: string;
  elo: number;
}

export interface UserRankOutputDTO {
  username: string;
  id: number;
  elo: number;
}

export interface UserReplayOutputDTO {
  username: string;
  id: number;
}
