import { Piece, Color } from "./Piece";
import { Position } from "./Position";
import type { Chessboard } from "./Chessboard";
export class Pawn extends Piece {
    constructor(color: Color) {
      super("Pawn", color);
    }
}
