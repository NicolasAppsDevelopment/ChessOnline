export class Position {
  public x: number;
  public y: number;
  constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
  }

  public equals(pos: Position): boolean {
    return this.x === pos.x && this.y === pos.y;
  }
}
