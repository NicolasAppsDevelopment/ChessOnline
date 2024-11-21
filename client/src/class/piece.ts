export enum Color {
  Black = "Black",
  White = "White"
}

export class Piece {
    protected name: string;
    protected color: Color
    protected x: number
    protected y: number
  
    constructor(name: string, color: Color, x: number, y:number) {
      this.name = name;
      this.color = color;
      this.x = x;
      this.y = y;
    }
    move(x: number, y:number) {
      this.x = x;
      this.y = y;
    }
  }