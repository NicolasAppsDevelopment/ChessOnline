import { Piece, Color } from "./Piece";
import {Position} from "./Position";
import type {Chessboard} from "./Chessboard";
export class Queen extends Piece {
    constructor(color: Color) {
      super("Queen", color);
    }
}
