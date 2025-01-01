import { MoveOutputDTO } from '../dto/move.dto'

export interface GameHistoryInputDTO {
  room_uuid: string;
}

export interface GameHistoryInputPatchDTO {
  winner_id?: number | null;
  blackPlayer_id?: number |  null;
  whitePlayer_id?: number | null;
}

export interface GameHistoryOutputDTO {
  id: number;
  room_uuid: string;
  blackPlayer_id?: number |  null;
  whitePlayer_id?: number |  null;
  winner_id?: number | null;
  moves?: MoveOutputDTO[] | null; 
}