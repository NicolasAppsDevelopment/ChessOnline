import { Piece } from "./piece";
export class Queen extends Piece {
    constructor(color: boolean, x: number, y:number) {
      super("Queen", color, x, y);
    }
    moveLeftUp(howFar: number) {
      super.move(this.x-howFar,this.y-howFar);
    }
    moveLeft(howFar: number) {
      super.move(this.x-howFar,this.y);
    }
    moveLeftDown(howFar: number) {
      super.move(this.x-howFar,this.y+howFar);
    }
    moveDown(howFar: number) {
      super.move(this.x,this.y+howFar);
    }
    moveRightDown(howFar: number) {
      super.move(this.x+howFar,this.y+howFar);
    }
    moveRight(howFar: number) {
      super.move(this.x+howFar,this.y);
    }
    moveRightUp(howFar: number) {
      super.move(this.x+howFar,this.y-howFar);
    }
    moveUp(howFar: number) {
      super.move(this.x,this.y+howFar);
    }
  }