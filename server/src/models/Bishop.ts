import { Piece, Color } from "./Piece";
import { Position } from "./Position";
import type {Chessboard} from "./Chessboard";
export class Bishop extends Piece {
    constructor(color: Color) {
      super("Bishop", color);
    }
    override getMoves(from: Position, board: Chessboard): Position[] {
      let moves: Position[] = [];

      // move down right
      for (let xyShift = 1; xyShift <= 8; xyShift++) {
        const newY = from.y + xyShift;
        const newX = from.x + xyShift;
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
        const newY = from.y + xyShift;
        const newX = from.x - xyShift;
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
        const newY = from.y - xyShift;
        const newX = from.x - xyShift;
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
        const newY = from.y - xyShift;
        const newX = from.x + xyShift;
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
