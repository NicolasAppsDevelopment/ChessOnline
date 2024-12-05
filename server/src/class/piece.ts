export enum Color {
    Black = "Black",
    White = "White"
}

export class Piece {
    protected name: string;
    protected color: Color
    protected sprite: string;
    protected x: number
    protected y: number

    constructor(name: string, color: Color, x: number, y:number) {
        this.name = name;
        this.color = color;
        this.sprite = "";
        this.x = x;
        this.y = y;

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

    move(x: number, y:number) {
        this.x = x;
        this.y = y;
    }
}
