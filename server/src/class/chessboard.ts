import { Piece } from "./piece";
import { Rook } from "./rook";
import { Knight } from "./knight";
import { Bishop } from "./bishop";
import { Queen } from "./queen";
import { King } from "./king";
import { Pawn } from "./pawn";

export class chessboard {
  public board: (Piece|null)[][];

  constructor() {
    this.board = [];
    for(var i: number = 0; i < 7; i++) {
      this.board[i] = [];
      for(var j: number = 0; j< 7; j++) {
        this.board[i][j] = null;
      }
    }

    //Create and place the whites pieces in the chessboard
    this.board[0][7] = new Rook(false,0,7);
    this.board[7][7] = new Rook(false,7,7);
    this.board[1][7] = new Knight(false,1,7);
    this.board[6][7] = new Knight(false,6,7);
    this.board[2][7] = new Bishop(false,2,7);
    this.board[5][7] = new Bishop(false,5,7);
    this.board[3][7] = new Queen(false,3,7);
    this.board[4][7] = new King(false,4,7);
    this.board[0][6] = new Pawn(false,0,6);
    this.board[1][6] = new Pawn(false,1,6);
    this.board[2][6] = new Pawn(false,2,6);
    this.board[3][6] = new Pawn(false,3,6);
    this.board[4][6] = new Pawn(false,4,6);
    this.board[5][6] = new Pawn(false,5,6);
    this.board[6][6] = new Pawn(false,6,6);
    this.board[7][6] = new Pawn(false,7,6);

    //Create and place the blacks pieces in the chessboard
    this.board[0][0] = new Rook(false,0,0);
    this.board[7][0] = new Rook(false,7,0);
    this.board[1][0] = new Knight(false,1,0);
    this.board[6][0] = new Knight(false,6,0);
    this.board[2][0] = new Bishop(false,2,0);
    this.board[5][0] = new Bishop(false,5,0);
    this.board[3][0] = new Queen(false,3,0);
    this.board[4][0] = new King(false,4,0);
    this.board[0][1] = new Pawn(false,0,1);
    this.board[1][1] = new Pawn(false,1,1);
    this.board[2][1] = new Pawn(false,2,1);
    this.board[3][1] = new Pawn(false,3,1);
    this.board[4][1] = new Pawn(false,4,1);
    this.board[5][1] = new Pawn(false,5,1);
    this.board[6][1] = new Pawn(false,6,1);
    this.board[7][1] = new Pawn(false,7,1);

  }
}