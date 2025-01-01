export interface MoveInputDTO {
  gameHistory_id: number;
  isABlackPiece: boolean;
  whichPiece: string;
  from: number[];
  to: number[];
}

export interface MoveOutputDTO {
  id: number;
  gameHistory_id: number;
  isABlackPiece: boolean;
  whichPiece: string;
  from: number[];
  to: number[];
}