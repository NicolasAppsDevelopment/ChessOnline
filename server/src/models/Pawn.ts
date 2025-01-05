import { Color, Piece } from './Piece'
import { Position } from './Position'
import type { Chessboard } from './Chessboard'

export class Pawn extends Piece {
  private firstMove: boolean;

  constructor(color: Color, firstMove: boolean = true) {
    super("Pawn", color);
    this.firstMove = firstMove;
  }

  protected override getAllMoves(from: Position, board: Chessboard): Position[] {
    let moves: Position[] = [];

    // move forward
    let yShift = this.color == Color.Black ? 1 : -1;
    for (let moveCount = 1; moveCount <= (this.firstMove ? 2 : 1); moveCount++) {
      const newY = from.y + yShift;
      if (0 <= newY && newY <= 7 &&
          board.getPiece(new Position(from.x, newY)) == null) {
        moves.push(new Position(from.x, newY));
      } else {
        break;
      }
      yShift += yShift;
    }

    // eat diagonally
    yShift = this.color == Color.Black ? 1 : -1;
    let xShift = 1;
    for (let _ = 0; _ < 2; _++) {
      const newY = from.y + yShift;
      const newX = from.x + xShift;
      if (0 <= newX && newX <= 7 &&
          0 <= newY && newY <= 7 &&
          board.getPiece(new Position(newX, newY)) != null
      ) {
        moves.push(new Position(newX, newY));
      }
      xShift = -xShift;
    }

    return moves;
  }

  firstMoveDone() {
    this.firstMove = false;
  }

  override clone(): Piece {
    return new Pawn(this.color, this.firstMove);
  }
}
