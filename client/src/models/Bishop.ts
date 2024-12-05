import { Piece, Color } from "./Piece";
export class Bishop extends Piece {
    constructor(color: Color, x: number, y:number) {
      super("Bishop", color, x, y);
    }
    moveLeftUp(howFar: number) {
      super.move(this.x-howFar,this.y-howFar);
    }
    moveLeftDown(howFar: number) {
      super.move(this.x-howFar,this.y+howFar);
    }
    moveRightDown(howFar: number) {
      super.move(this.x+howFar,this.y+howFar);
    }
    moveRightUp(howFar: number) {
      super.move(this.x+howFar,this.y-howFar);
    }
  }
