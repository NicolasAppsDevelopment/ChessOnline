import { Piece } from "./piece";
export class Rook extends Piece {
    constructor(color: boolean, x: number, y:number) {
      super("Rook", color, x, y);
    }
    moveLeft(howFar: number) {
      super.move(this.x-howFar,this.y);
    }
    moveDown(howFar: number) {
      super.move(this.x,this.y+howFar);
    }
    moveRight(howFar: number) {
      super.move(this.x+howFar,this.y);
    }
    moveUp(howFar: number) {
      super.move(this.x,this.y+howFar);
    }
  }