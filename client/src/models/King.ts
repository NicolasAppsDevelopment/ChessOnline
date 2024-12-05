import { Piece, Color } from "./Piece";
export class King extends Piece {
    constructor(color: Color, x: number, y:number) {
      super("King", color, x, y);
    }
    moveLeftUp() {
      super.move(this.x-1,this.y-1);
    }
    moveLeft() {
      super.move(this.x-1,this.y);
    }
    moveLeftDown() {
      super.move(this.x-1,this.y+1);
    }
    moveDown() {
      super.move(this.x,this.y+1);
    }
    moveRightDown() {
      super.move(this.x+1,this.y+1);
    }
    moveRight() {
      super.move(this.x+1,this.y);
    }
    moveRightUp() {
      super.move(this.x+1,this.y-1);
    }
    moveUp() {
      super.move(this.x,this.y+1);
    }
  }
