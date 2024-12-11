import { Piece, Color } from "./Piece";
import { Position } from "@/models/Position";
import type {Chessboard} from "@/models/Chessboard";
export class Bishop extends Piece {
    constructor(color: Color, position: Position) {
      super("Bishop", color, position);
    }
    override getMoves(board: Chessboard): Position[] {
      let moves: Position[] = [];

      // move down right
      for (let xyShift = 1; xyShift <= 8; xyShift++) {
        const newY = this.position.y + xyShift;
        const newX = this.position.x + xyShift;
        if (newY <= 7 && newX <= 7) {
          moves.push(new Position(newX, newY));
          if (board.getPiece(new Position(newX, newY)) != null) {
            break;
          }
        } else {
          break;
        }
      }

      // move down left
      for (let xyShift = 1; xyShift <= 8; xyShift++) {
        const newY = this.position.y + xyShift;
        const newX = this.position.x - xyShift;
        if (newY <= 7 && 0 <= newX) {
          moves.push(new Position(newX, newY));
          if (board.getPiece(new Position(newX, newY)) != null) {
            break;
          }
        } else {
          break;
        }
      }

      // move up left
      for (let xyShift = 1; xyShift <= 8; xyShift++) {
        const newY = this.position.y - xyShift;
        const newX = this.position.x - xyShift;
        if (0 <= newY && 0 <= newX) {
          moves.push(new Position(newX, newY));
          if (board.getPiece(new Position(newX, newY)) != null) {
            break;
          }
        } else {
          break;
        }
      }

      // move up right
      for (let xyShift = 1; xyShift <= 8; xyShift++) {
        const newY = this.position.y - xyShift;
        const newX = this.position.x + xyShift;
        if (0 <= newY && newX <= 7) {
          moves.push(new Position(newX, newY));
          if (board.getPiece(new Position(newX, newY)) != null) {
            break;
          }
        } else {
          break;
        }
      }

      return moves;
    }
}
