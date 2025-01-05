import { UserReplayOutputDTO } from './user.dto'
import { MoveReplayOutputDTO } from './move.dto'

export interface GameHistoryVisibilityInputPutDTO {
  id: number;
  isPublic: boolean;
}

export interface GameHistoryOutputDTO {
  id: number;
  startDate: Date;
  blackPlayer?: UserReplayOutputDTO | null;
  whitePlayer?: UserReplayOutputDTO | null;
  winner?: UserReplayOutputDTO | null;
  isPublic: boolean;
}

export interface GameReplayOutputDTO {
  blackPlayer?: UserReplayOutputDTO |  null;
  whitePlayer?: UserReplayOutputDTO |  null;
  winner?: UserReplayOutputDTO | null;
  moves?: MoveReplayOutputDTO[] | null;
}