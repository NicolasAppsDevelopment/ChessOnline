import { UserRankOutputDTO } from '../dto/user.dto'
import { ListRoomItemOutputDTO } from '../dto/room.dto'
import { MoveOutputDTO } from '../dto/move.dto'

export interface GameHistoryInputDTO {
  room_uuid: string;
  date: Date;
}

export interface GameHistoryInputPatchDTO {
  winner_id?: number | null;
  blackPlayer_id?: number |  null;
  whitePlayer_id?: number | null;
}

export interface GameHistoryOutputDTO {
  id: number;
  date: Date;
  room: ListRoomItemOutputDTO;
  blackPlayer?: UserRankOutputDTO |  null;
  whitePlayer?: UserRankOutputDTO |  null;
  winner?: UserRankOutputDTO | null;
  moves?: MoveOutputDTO[] | null; 
}