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
  password: string;
  elo: number;
}

export interface UserRankOutputDTO {
  username: string;
  elo: number;
}
