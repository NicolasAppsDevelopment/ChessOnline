import { UserRankOutputDTO } from '../dto/user.dto'
import { ListRoomItemOutputDTO } from '../dto/room.dto'
import { MoveOutputDTO } from '../dto/move.dto'

export interface GameHistoryInputDTO {
  room_uuid: string;
  startDate: Date;
}

export interface GameHistoryVisibilityInputPutDTO {
  id: number;
  isPublic: boolean;
}

export interface GameHistoryOutputDTO {
  id: number;
  startDate: Date;
  room: ListRoomItemOutputDTO | null;
  blackPlayer?: UserRankOutputDTO | null;
  whitePlayer?: UserRankOutputDTO | null;
  winner?: UserRankOutputDTO | null;
  moves?: MoveOutputDTO[] | null;
  isPublic: boolean;
}

export interface GameReplayOutputDTO {
  blackPlayer?: UserRankOutputDTO |  null;
  whitePlayer?: UserRankOutputDTO |  null;
  winner?: UserRankOutputDTO | null;
  moves?: MoveOutputDTO[] | null;
}