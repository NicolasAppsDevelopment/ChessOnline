import type {Position} from "@/models/Position";
import type {Piece} from "@/models/Piece";

export class Cell {
  public piece: Piece | null;
  public readonly position: Position;
  public isHighlighted: boolean;

  constructor(position: Position, piece: Piece | null, isHighlighted: boolean = false) {
    this.position = position;
    this.piece = piece;
    this.isHighlighted = isHighlighted;
  }
}
