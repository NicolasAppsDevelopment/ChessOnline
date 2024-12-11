import { Piece, Color } from "./Piece";
import {Position} from "@/models/Position";
import type {Chessboard} from "@/models/Chessboard";
export class Rook extends Piece {
    constructor(color: Color, position: Position) {
      super("Rook", color, position);
    }

    override getMoves(board: Chessboard): Position[] {
      let moves: Position[] = [];

      // move down
      for (let yShift = 1; yShift <= 8; yShift++) {
        const newY = this.position.y + yShift;
        if (newY <= 7) {
          moves.push(new Position(this.position.x, newY));
          if (board.getPiece(new Position(this.position.x, newY)) != null) {
            break;
          }
        } else {
          break;
        }
      }

      // move up
      for (let yShift = 1; yShift <= 8; yShift++) {
        const newY = this.position.y - yShift;
        if (0 <= newY) {
          moves.push(new Position(this.position.x, newY));
          if (board.getPiece(new Position(this.position.x, newY)) != null) {
            break;
          }
        } else {
          break;
        }
      }

      // move right
      for (let xShift = 1; xShift <= 8; xShift++) {
        const newX = this.position.x + xShift;
        if (newX <= 7) {
          moves.push(new Position(newX, this.position.y));
          if (board.getPiece(new Position(newX, this.position.y)) != null) {
            break;
          }
        } else {
          break;
        }
      }

      // move left
      for (let xShift = 1; xShift <= 8; xShift++) {
        const newX = this.position.x - xShift;
        if (0 <= newX) {
          moves.push(new Position(newX, this.position.y));
          if (board.getPiece(new Position(newX, this.position.y)) != null) {
            break;
          }
        } else {
          break;
        }
      }

      return moves;
    }
  }
