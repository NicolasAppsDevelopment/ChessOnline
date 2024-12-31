import { Piece, Color } from "./Piece";
import { Position } from "./Position";
import type {Chessboard} from "./Chessboard";
export class Knight extends Piece {
    constructor(color: Color) {
      super("Knight", color);
    }
}
