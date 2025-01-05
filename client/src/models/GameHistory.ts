import type { Move } from "./Move";
import type { ListRoomItem } from "./Room";
import type { UserRank } from "./User";

export interface GameHistory {
  id: number;
  startDate: Date;
  endDate?: Date | null;
  room: ListRoomItem;
  blackPlayer?: UserRank |  null;
  whitePlayer?: UserRank |  null;
  winner?: UserRank | null;
  moves?: Move[] | null; 
}