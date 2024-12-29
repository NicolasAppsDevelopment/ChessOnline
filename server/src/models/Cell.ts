import type {Position} from "./Position";
import type {Piece} from "./Piece";

export class Cell {
  public piece: Piece | null;
  public readonly position: Position;
  public readonly id: string;
  public isHighlighted: boolean;

  constructor(position: Position, piece: Piece | null, isHighlighted: boolean = false) {
    this.position = position;
    this.piece = piece;
    this.isHighlighted = isHighlighted;
    this.id = String.fromCharCode(65 + this.position.x) + "" + (8 - this.position.y);
  }

  clone(): Cell {
    return new Cell(this.position, this.piece?.clone() ?? null, this.isHighlighted);
  }
}
