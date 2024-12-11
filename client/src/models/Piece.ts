import type {Position} from "@/models/Position";
import type {Chessboard} from "@/models/Chessboard";

export enum Color {
  Black = "Black",
  White = "White"
}

export abstract class Piece {
    protected name: string;
    protected color: Color
    protected sprite: string;
    protected position: Position;

    protected constructor(name: string, color: Color, position: Position) {
      this.name = name;
      this.color = color;
      this.sprite = "";
      this.position = position;

      if (color == Color.Black) {
        switch (name) {
          case "Rook" :
            this.sprite = "/src/assets/images/red rook.png";
            break
          case "Knight" :
            this.sprite = "/src/assets/images/red knight.png";
            break
          case "Bishop" :
            this.sprite = "/src/assets/images/red bishop.png";
            break
          case "Queen" :
            this.sprite = "/src/assets/images/red queen.png";
            break
          case "King" :
            this.sprite = "/src/assets/images/red king.png";
            break
          case "Pawn" :
            this.sprite = "/src/assets/images/red pawn.png";
            break
        }
      } else {
        switch (name) {
          case "Rook" :
            this.sprite = "/src/assets/images/green rook.png";
            break
          case "Knight" :
            this.sprite = "/src/assets/images/green knight.png";
            break
          case "Bishop" :
            this.sprite = "/src/assets/images/green bishop.png";
            break
          case "Queen" :
            this.sprite = "/src/assets/images/green queen.png";
            break
          case "King" :
            this.sprite = "/src/assets/images/green king.png";
            break
          case "Pawn" :
            this.sprite = "/src/assets/images/green pawn.png";
            break
        }
      }
    }

    getName() {
      return this.name;
    }
    getColor() {
      return this.color;
    }
    getSprite() {
      return this.sprite;
    }
    getPosition() {
      return this.position;
    }
    setPosition(position: Position) {
      this.position = position;
    }
    abstract getMoves(board: Chessboard): Position[] {
      throw new Error("Method not implemented.");
    }
    checkMove(to: Position, board: Chessboard): boolean {
      for (let move of this.getMoves(board)) {
        if (move.equals(to)) {
          return true;
        }
      }
      return false;
    }
  }
