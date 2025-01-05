import { Color, Piece } from './Piece'

export class Pawn extends Piece {
    constructor(color: Color) {
      super("Pawn", color);
    }
}
