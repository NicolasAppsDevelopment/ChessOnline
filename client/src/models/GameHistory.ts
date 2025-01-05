import type { MoveReplay } from './MoveReplay'
import type { UserReplay } from './User'

export interface GameHistory {
  id: number;
  startDate: Date;
  blackPlayer?: UserReplay |  null;
  whitePlayer?: UserReplay |  null;
  winner?: UserReplay | null;
  isPublic: boolean;
}

export interface GameReplay {
  blackPlayer?: UserReplay |  null;
  whitePlayer?: UserReplay |  null;
  winner?: UserReplay | null;
  moves?: MoveReplay[] | null;
}

