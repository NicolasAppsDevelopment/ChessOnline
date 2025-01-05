export interface MoveInputDTO {
  gameHistory_id: number;
  promotion: boolean;
  promotionIntoWhichPiece: string;
  from_x: number;
  from_y: number;
  to_x: number;
  to_y: number;
}

export interface MoveOutputDTO {
  id: number;
  gameHistory_id: number;
  promotion: boolean;
  promotionIntoWhichPiece: string;
  from_x: number;
  from_y: number;
  to_x: number;
  to_y: number;
}

export interface MoveReplayOutputDTO {
  promotion: boolean;
  promotionIntoWhichPiece: string;
  from_x: number;
  from_y: number;
  to_x: number;
  to_y: number;
}