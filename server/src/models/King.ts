import { Piece, Color } from "./Piece";
import { Position } from "./Position";
import type {Chessboard} from "./Chessboard";
export class King extends Piece {
  constructor(color: Color) {
    super("King", color);
  }

  protected override getAllMoves(from: Position, board: Chessboard): Position[] {
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

    return moves;
  }

  public isInCheck(from: Position, board: Chessboard): boolean {
    let opponentColor = this.color === Color.White ? Color.Black : Color.White;
    for (let cell of board.board) {
      if (cell.piece !== null && cell.piece.getColor() === opponentColor) {
        let moves = cell.piece.getValidMoves(cell.position, board);
        for (let move of moves) {
          if (move.equals(from)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  override clone(): Piece {
    return new King(this.color);
  }
}
