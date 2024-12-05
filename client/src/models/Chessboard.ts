import { Piece, Color } from "./Piece";
import { Rook } from "./Rook";
import { Knight } from "./Knight";
import { Bishop } from "./Bishop";
import { Queen } from "./Queen";
import { King } from "./King";
import { Pawn } from "./Pawn";

export class Chessboard {
  public board: (Piece|null)[][];

  constructor() {
    this.board = [];
    for(let i: number = 0; i <= 7; i++) {
      this.board[i] = [];
      for(let j: number = 0; j <= 7; j++) {
        this.board[i][j] = null;
      }
    }

    //Create and place the whites pieces in the chessboard
    this.board[0][7] = new Rook(Color.White,0,7);
    this.board[7][7] = new Rook(Color.White,7,7);
    this.board[1][7] = new Knight(Color.White,1,7);
    this.board[6][7] = new Knight(Color.White,6,7);
    this.board[2][7] = new Bishop(Color.White,2,7);
    this.board[5][7] = new Bishop(Color.White,5,7);
    this.board[3][7] = new Queen(Color.White,3,7);
    this.board[4][7] = new King(Color.White,4,7);
    this.board[0][6] = new Pawn(Color.White,0,6);
    this.board[1][6] = new Pawn(Color.White,1,6);
    this.board[2][6] = new Pawn(Color.White,2,6);
    this.board[3][6] = new Pawn(Color.White,3,6);
    this.board[4][6] = new Pawn(Color.White,4,6);
    this.board[5][6] = new Pawn(Color.White,5,6);
    this.board[6][6] = new Pawn(Color.White,6,6);
    this.board[7][6] = new Pawn(Color.White,7,6);

    //Create and place the blacks pieces in the chessboard
    this.board[0][0] = new Rook(Color.Black,0,0);
    this.board[7][0] = new Rook(Color.Black,7,0);
    this.board[1][0] = new Knight(Color.Black,1,0);
    this.board[6][0] = new Knight(Color.Black,6,0);
    this.board[2][0] = new Bishop(Color.Black,2,0);
    this.board[5][0] = new Bishop(Color.Black,5,0);
    this.board[3][0] = new Queen(Color.Black,3,0);
    this.board[4][0] = new King(Color.Black,4,0);
    this.board[0][1] = new Pawn(Color.Black,0,1);
    this.board[1][1] = new Pawn(Color.Black,1,1);
    this.board[2][1] = new Pawn(Color.Black,2,1);
    this.board[3][1] = new Pawn(Color.Black,3,1);
    this.board[4][1] = new Pawn(Color.Black,4,1);
    this.board[5][1] = new Pawn(Color.Black,5,1);
    this.board[6][1] = new Pawn(Color.Black,6,1);
    this.board[7][1] = new Pawn(Color.Black,7,1);

  }
}
