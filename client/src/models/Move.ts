export interface Move {
  id: number;
  gameHistory_id: number;
  isABlackPiece: boolean;
  whichPiece: string;
  from: number[];
  to: number[];
}