import {Color, Piece} from "./Piece";
import {Rook} from "./Rook";
import {Knight} from "./Knight";
import {Bishop} from "./Bishop";
import {Queen} from "./Queen";
import {King} from "./King";
import {Pawn} from "./Pawn";
import {Position} from "@/models/Position";

export class Chessboard {
  public board: Piece[] = [];

  constructor() {
    //Create and place the whites pieces in the chessboard
    this.board.push(new Rook(Color.White,new Position(0,7)));
    this.board.push(new Rook(Color.White,new Position(7,7)));
    this.board.push(new Knight(Color.White,new Position(1,7)));
    this.board.push(new Knight(Color.White,new Position(6,7)));
    this.board.push(new Bishop(Color.White,new Position(2,7)));
    this.board.push(new Bishop(Color.White,new Position(5,7)));
    this.board.push(new Queen(Color.White,new Position(3,7)));
    this.board.push(new King(Color.White,new Position(4,7)));
    for (let i = 0; i < 8; i++) {
      this.board.push(new Pawn(Color.White, new Position(i, 6)));
    }

    //Create and place the blacks pieces in the chessboard
    this.board.push(new Rook(Color.Black, new Position(0,0)));
    this.board.push(new Rook(Color.Black, new Position(7,0)));
    this.board.push(new Knight(Color.Black, new Position(1,0)));
    this.board.push(new Knight(Color.Black, new Position(6,0)));
    this.board.push(new Bishop(Color.Black, new Position(2,0)));
    this.board.push(new Bishop(Color.Black, new Position(5,0)));
    this.board.push(new Queen(Color.Black, new Position(3,0)));
    this.board.push(new King(Color.Black, new Position(4,0)));
    for (let i = 0; i < 8; i++) {
      this.board.push(new Pawn(Color.Black, new Position(i, 1)));
    }
  }

  movePiece(from: Position, to: Position) {
    if (from.equals(to)) {
      return; // can't eat yourself (on your own cell)
    }

    const pieceToMove = this.getPiece(from);
    const pieceOnArrivalCell = this.getPiece(to);

    if (pieceToMove?.getColor() == pieceOnArrivalCell?.getColor()) {
      return; // can't eat yourself (a piece of your color)
    }

    if (!pieceToMove?.checkMove(to, this)) {
      return;
    }

    if (pieceOnArrivalCell) {
      const index = this.board.indexOf(pieceOnArrivalCell, 0);
      this.board.splice(index, 1)
    }
    pieceToMove?.setPosition(to);

    if (pieceToMove instanceof Pawn) {
      pieceToMove.firstMoveDone(); // Pawn first move

      // Promotion rule
      if (pieceToMove.getColor() == Color.White && to.y == 0) {
        this.board.push(new Queen(Color.White, to));
        this.removePiece(pieceToMove);
      } else if (pieceToMove.getColor() == Color.Black && to.y == 7) {
        this.board.push(new Queen(Color.Black, to));
        this.removePiece(pieceToMove);
      }
    }
  }

  getPiece(from: Position): Piece | null {
    let result: Piece | null = null;
    this.board.forEach(function (piece) {
      if (piece.getPosition().equals(from)) {
        result = piece;
        return;
      }
    });

    return result;
  }

  removePiece(piece: Piece) {
    const index = this.board.indexOf(piece, 0);
    this.board.splice(index, 1)
  }

  getBoard() {
    let board: (Piece | Position)[][] = [];

    for (let x = 0; x < 8; x++) {
      board[x] = [];
      for (let y = 0; y < 8; y++) {
        board[x][y] = new Position(x, y);
      }
    }

    this.board.forEach(function (piece) {
      board[piece.getPosition().x][piece.getPosition().y] = piece;
    });

    return board;
  }
}
