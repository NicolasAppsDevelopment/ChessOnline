export class Piece {
    protected name: string;
    protected color: boolean //0 is white and 1 is black
    protected x: number
    protected y: number
  
    constructor(name: string, color: boolean, x: number, y:number) {
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