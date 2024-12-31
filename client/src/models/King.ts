import { Piece, Color } from "./Piece";
import { Position } from "./Position";
import type {Chessboard} from "./Chessboard";
export class King extends Piece {
    constructor(color: Color) {
      super("King", color);
    }
}
