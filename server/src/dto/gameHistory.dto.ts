import { UserRankOutputDTO } from '../dto/user.dto'
import { ListRoomItemOutputDTO } from '../dto/room.dto'
import { MoveOutputDTO } from '../dto/move.dto'

export interface GameHistoryInputDTO {
  room_uuid: string;
  startDate: Date;
}

export interface GameHistoryInputPatchDTO {
  endDate?: Date | null;
  winner_id?: number | null;
  blackPlayer_id?: number |  null;
  whitePlayer_id?: number | null;
}

export interface GameHistoryOutputDTO {
  id: number;
  startDate: Date;
  endDate?: Date | null;
  room: ListRoomItemOutputDTO;
  blackPlayer?: UserRankOutputDTO |  null;
  whitePlayer?: UserRankOutputDTO |  null;
  winner?: UserRankOutputDTO | null;
  moves?: MoveOutputDTO[] | null; 
}