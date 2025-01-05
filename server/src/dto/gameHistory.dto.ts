import { UserReplayOutputDTO } from '../dto/user.dto'
import { ListRoomItemOutputDTO } from '../dto/room.dto'
import { MoveReplayOutputDTO } from '../dto/move.dto'

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