import { Piece, Color } from "./Piece";
import { Position } from "./Position";
import type {Chessboard} from "./Chessboard";
export class King extends Piece {
    constructor(color: Color) {
      super("King", color);
    }

    override getMoves(from: Position, board: Chessboard): Position[] {
      let moves: Position[] = [];

      if (from.x-1 >= 0 && from.y-1 >= 0) {
        moves.push(new Position(from.x-1,from.y-1));
      }

      if (from.x-1 >= 0) {
        moves.push(new Position(from.x-1,from.y));
      }

      if (from.x-1 >= 0 && from.y+1 < 8) {
        moves.push(new Position(from.x-1,from.y+1));
      }

      if (from.y+1 < 8) {
        moves.push(new Position(from.x,from.y+1));
      }

      if (from.x+1 < 8 && from.y+1 < 8) {
        moves.push(new Position(from.x+1,from.y+1));
      }

      if (from.x+1 < 8) {
        moves.push(new Position(from.x+1,from.y));
      }

      if (from.x+1 < 8 && from.y-1 >= 0) {
        moves.push(new Position(from.x+1,from.y-1));
      }

      if (from.y-1 >= 0) {
        moves.push(new Position(from.x,from.y-1));
      }

      // TODO: Verify that the king is not moving into check

      return moves;
    }
  }
