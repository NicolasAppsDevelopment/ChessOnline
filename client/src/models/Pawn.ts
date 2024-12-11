import { Piece, Color } from "./Piece";
import { Position } from "@/models/Position";
import type {Chessboard} from "@/models/Chessboard";
export class Pawn extends Piece {
    private firstMove: boolean;

    constructor(color: Color, position: Position) {
      super("Pawn", color, position);
      this.firstMove = true;
    }

    override getMoves(board: Chessboard): Position[] {
      let moves: Position[] = [];

      // move forward
      let yShift = this.color == Color.Black ? 1 : -1;
      for (let moveCount = 1; moveCount <= (this.firstMove ? 2 : 1); moveCount++) {
        const newY = this.position.y + yShift;
        if (0 <= newY && newY <= 7 &&
            board.getPiece(new Position(this.position.x, newY)) == null) {
          moves.push(new Position(this.position.x, newY));
        } else {
          break;
        }
        yShift += yShift;
      }

      // eat diagonally
      yShift = this.color == Color.Black ? 1 : -1;
      let xShift = 1;
      for (let _ = 0; _ < 2; _++) {
        const newY = this.position.y + yShift;
        const newX = this.position.x + xShift;
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
}
