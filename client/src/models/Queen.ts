import { Color, Piece } from './Piece'

export class Queen extends Piece {
    constructor(color: Color) {
      super("Queen", color);
    }
}
