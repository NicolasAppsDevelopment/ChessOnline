import { Piece, Color } from "./Piece";
export class Knight extends Piece {
    constructor(color: Color, x: number, y:number) {
      super("Knight", color, x, y);
    }
    moveLightLeftHeavyUp() {
      super.move(this.x-1,this.y-2);
    }
    moveHeavyLeftLightUp() {
      super.move(this.x-2,this.y-1);
    }
    moveLightLeftHeavyDown() {
      super.move(this.x-1,this.y+2);
    }
    moveHeavyLeftLightDown() {
      super.move(this.x-1,this.y-2);
    }
    moveLightRightHeavyUp() {
      super.move(this.x+1,this.y-2);
    }
    moveHeavyRightLightUp() {
      super.move(this.x+2,this.y-1);
    }
    moveLightRightHeavyDown() {
      super.move(this.x+1,this.y+2);
    }
    moveHeavyRightLightDown() {
      super.move(this.x+2,this.y+1);
    }
  }
