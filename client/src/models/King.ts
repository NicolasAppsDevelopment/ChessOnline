import { Color, Piece } from './Piece'

export class King extends Piece {
    constructor(color: Color) {
      super("King", color);
    }
}
