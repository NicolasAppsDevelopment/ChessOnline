import { Color, Piece } from './Piece'
import { Position } from './Position'
import type { Chessboard } from './Chessboard'

export class Queen extends Piece {
  constructor(color: Color) {
    super("Queen", color);
  }

  protected override getAllMoves(from: Position, board: Chessboard): Position[] {
    let moves: Position[] = [];

    // move down
    for (let yShift = 1; yShift <= 8; yShift++) {
      const newY = from.y + yShift;
      if (newY <= 7) {
        moves.push(new Position(from.x, newY));
        if (board.getPiece(new Position(from.x, newY)) != null) {
          break;
        }
      } else {
        break;
      }
    }

    // move up
    for (let yShift = 1; yShift <= 8; yShift++) {
      const newY = from.y - yShift;
      if (0 <= newY) {
        moves.push(new Position(from.x, newY));
        if (board.getPiece(new Position(from.x, newY)) != null) {
          break;
        }
      } else {
        break;
      }
    }

    // move right
    for (let xShift = 1; xShift <= 8; xShift++) {
      const newX = from.x + xShift;
      if (newX <= 7) {
        moves.push(new Position(newX, from.y));
        if (board.getPiece(new Position(newX, from.y)) != null) {
          break;
        }
      } else {
        break;
      }
    }

    // move left
    for (let xShift = 1; xShift <= 8; xShift++) {
      const newX = from.x - xShift;
      if (0 <= newX) {
        moves.push(new Position(newX, from.y));
        if (board.getPiece(new Position(newX, from.y)) != null) {
          break;
        }
      } else {
        break;
      }
    }

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

  override clone(): Piece {
    return new Queen(this.color);
  }
}
