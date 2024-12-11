import { Piece, Color } from "./Piece";
import { Position } from "@/models/Position";
import type {Chessboard} from "@/models/Chessboard";
export class Knight extends Piece {
    constructor(color: Color, position: Position) {
      super("Knight", color, position);
    }

    override getMoves(board: Chessboard): Position[] {
      let moves: Position[] = [];

      if (this.position.x-2 >= 0 && this.position.y-1 >= 0) {
        moves.push(new Position(this.position.x-2,this.position.y-1));
      }

      if (this.position.x-2 >= 0 && this.position.y+1 < 8) {
        moves.push(new Position(this.position.x-2,this.position.y+1));
      }

      if (this.position.x-1 >= 0 && this.position.y-2 >= 0) {
        moves.push(new Position(this.position.x-1,this.position.y-2));
      }

      if (this.position.x-1 >= 0 && this.position.y+2 < 8) {
        moves.push(new Position(this.position.x-1,this.position.y+2));
      }

      if (this.position.x+1 < 8 && this.position.y-2 >= 0) {
        moves.push(new Position(this.position.x+1,this.position.y-2));
      }

      if (this.position.x+1 < 8 && this.position.y+2 < 8) {
        moves.push(new Position(this.position.x+1,this.position.y+2));
      }

      if (this.position.x+2 < 8 && this.position.y-1 >= 0) {
        moves.push(new Position(this.position.x+2,this.position.y-1));
      }

      if (this.position.x+2 < 8 && this.position.y+1 < 8) {
        moves.push(new Position(this.position.x+2,this.position.y+1));
      }

      return moves;
    }
}
