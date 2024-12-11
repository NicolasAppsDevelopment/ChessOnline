import { Piece, Color } from "./Piece";
import { Position } from "@/models/Position";
import type {Chessboard} from "@/models/Chessboard";
export class King extends Piece {
    constructor(color: Color, position: Position) {
      super("King", color, position);
    }

    override getMoves(board: Chessboard): Position[] {
      let moves: Position[] = [];

      if (this.position.x-1 >= 0 && this.position.y-1 >= 0) {
        moves.push(new Position(this.position.x-1,this.position.y-1));
      }

      if (this.position.x-1 >= 0) {
        moves.push(new Position(this.position.x-1,this.position.y));
      }

      if (this.position.x-1 >= 0 && this.position.y+1 < 8) {
        moves.push(new Position(this.position.x-1,this.position.y+1));
      }

      if (this.position.y+1 < 8) {
        moves.push(new Position(this.position.x,this.position.y+1));
      }

      if (this.position.x+1 < 8 && this.position.y+1 < 8) {
        moves.push(new Position(this.position.x+1,this.position.y+1));
      }

      if (this.position.x+1 < 8) {
        moves.push(new Position(this.position.x+1,this.position.y));
      }

      if (this.position.x+1 < 8 && this.position.y-1 >= 0) {
        moves.push(new Position(this.position.x+1,this.position.y-1));
      }

      if (this.position.y-1 >= 0) {
        moves.push(new Position(this.position.x,this.position.y-1));
      }

      // TODO: Verify that the king is not moving into check

      return moves;
    }
  }
