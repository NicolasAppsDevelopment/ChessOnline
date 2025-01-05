import { Color, Piece } from './Piece'
import { Position } from './Position'
import type { Chessboard } from './Chessboard'

export class Knight extends Piece {
  constructor(color: Color) {
    super("Knight", color);
  }

  protected override getAllMoves(from: Position, board: Chessboard): Position[] {
    let moves: Position[] = [];

    if (from.x-2 >= 0 && from.y-1 >= 0) {
      moves.push(new Position(from.x-2,from.y-1));
    }

    if (from.x-2 >= 0 && from.y+1 < 8) {
      moves.push(new Position(from.x-2,from.y+1));
    }

    if (from.x-1 >= 0 && from.y-2 >= 0) {
      moves.push(new Position(from.x-1,from.y-2));
    }

    if (from.x-1 >= 0 && from.y+2 < 8) {
      moves.push(new Position(from.x-1,from.y+2));
    }

    if (from.x+1 < 8 && from.y-2 >= 0) {
      moves.push(new Position(from.x+1,from.y-2));
    }

    if (from.x+1 < 8 && from.y+2 < 8) {
      moves.push(new Position(from.x+1,from.y+2));
    }

    if (from.x+2 < 8 && from.y-1 >= 0) {
      moves.push(new Position(from.x+2,from.y-1));
    }

    if (from.x+2 < 8 && from.y+1 < 8) {
      moves.push(new Position(from.x+2,from.y+1));
    }

    return moves;
  }

  override clone(): Piece {
    return new Knight(this.color);
  }
}
