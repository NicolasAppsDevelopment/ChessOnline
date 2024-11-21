import { Piece } from "./piece";
export class Pawn extends Piece {
    private firstMove: boolean;
  
    constructor(color: boolean, x: number, y:number) {
      super("Pawn", color, x, y);
      this.firstMove = true;
    }
    // TODO    
    // 1-  prendre en compte que son champ d'attaque n'est pas pareil que son champ de déplacement. 
    // 2-  prendre en compte que le pion peut se déplacer de 1 à 2 cases lorsque c'est sont premier mouvement.
    // 3-  est ce que le pion est obligé de manger si il peut ? 
    move() { 
      if (!this.color){
        super.move(this.x,this.y+1);
      } else{
        super.move(this.x,this.y+1);
      }
      this.firstMove = false;
    }
  
    move2case() { 
      if (!this.color && this.firstMove){
        super.move(this.x,this.y+2);
      }
      if (this.color &&this.firstMove) {
        super.move(this.x,this.y+2);
      } 
      this.firstMove = false;
    }
  
    attack() { 
      if (!this.color){
        super.move(this.x,this.y+1);
      } else{
        super.move(this.x,this.y+1);
      }
      this.firstMove = false;
    }
  }