import { Piece, Color } from "./Piece";
import {Position} from "./Position";
import type {Chessboard} from "./Chessboard";
export class Rook extends Piece {
    constructor(color: Color) {
      super("Rook", color);
    }
}
