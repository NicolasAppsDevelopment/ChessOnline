import { Piece, Color } from "./Piece";
import { Position } from "./Position";
import type {Chessboard} from "./Chessboard";
export class Bishop extends Piece {
    constructor(color: Color) {
      super("Bishop", color);
    }
}
