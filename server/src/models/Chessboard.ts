import {Color, Piece} from "./Piece";
import {Rook} from "./Rook";
import {Knight} from "./Knight";
import {Bishop} from "./Bishop";
import {Queen} from "./Queen";
import {King} from "./King";
import {Pawn} from "./Pawn";
import {Position} from "./Position";
import {Cell} from "./Cell";

export class Chessboard {
  public board: Cell[] = [];
  public turnIndex : number = 0;// true is White turn (first player), false is Black turn (second player)
  public playersId : number[] = [];
  public isCloned: boolean = false;

  constructor() {
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        this.board.push(new Cell(new Position(x, y), null));
      }
    }

    //Create and place the whites pieces in the chessboard
    this.getCellFromXY(0, 7)!.piece = new Rook(Color.White);
    this.getCellFromXY(7, 7)!.piece = new Rook(Color.White);
    this.getCellFromXY(1, 7)!.piece = new Knight(Color.White);
    this.getCellFromXY(6, 7)!.piece = new Knight(Color.White);
    this.getCellFromXY(2, 7)!.piece = new Bishop(Color.White);
    this.getCellFromXY(5, 7)!.piece = new Bishop(Color.White);
    this.getCellFromXY(3, 7)!.piece = new Queen(Color.White);
    this.getCellFromXY(4, 7)!.piece = new King(Color.White);
    for (let i = 0; i < 8; i++) {
      this.getCellFromXY(i, 6)!.piece = new Pawn(Color.White);
    }

    //Create and place the blacks pieces in the chessboard
    this.getCellFromXY(0, 0)!.piece = new Rook(Color.Black);
    this.getCellFromXY(7, 0)!.piece = new Rook(Color.Black);
    this.getCellFromXY(1, 0)!.piece = new Knight(Color.Black);
    this.getCellFromXY(6, 0)!.piece = new Knight(Color.Black);
    this.getCellFromXY(2, 0)!.piece = new Bishop(Color.Black);
    this.getCellFromXY(5, 0)!.piece = new Bishop(Color.Black);
    this.getCellFromXY(3, 0)!.piece = new Queen(Color.Black);
    this.getCellFromXY(4, 0)!.piece = new King(Color.Black);
    for (let i = 0; i < 8; i++) {
      this.getCellFromXY(i, 1)!.piece = new Pawn(Color.Black);
    }
  }

  movePiece(from: Position, to: Position) {
    const fromCell = this.getCellFromPosition(from);
    const toCell = this.getCellFromPosition(to);
    if (!fromCell || !toCell) return false;

    const pieceToMove = fromCell.piece;
    if (!pieceToMove) return false;

    if (!pieceToMove.checkMove(from, to, this)) {
      return false;
    }

    if (pieceToMove instanceof Pawn) {
      pieceToMove.firstMoveDone(); // Pawn first move

      // Promotion rule
      if (pieceToMove.getColor() == Color.White && to.y == 0) {
        fromCell.piece = new Queen(Color.White);
      } else if (pieceToMove.getColor() == Color.Black && to.y == 7) {
        fromCell.piece = new Queen(Color.Black);
      }
    }

    toCell.piece = fromCell.piece;
    fromCell.piece = null;

    return true;
  }

  getPiece(position: Position): Piece | null {
    const cell = this.getCellFromPosition(position);
    if (cell) {
      return cell.piece;
    }

    return null;
  }

  getCellFromPosition(from: Position): Cell | null {
    let result: Cell | null = null;
    this.board.forEach(function (cell) {
      if (cell.position.equals(from)) {
        result = cell;
        return;
      }
    });

    return result;
  }

  getCellFromXY(x: number, y: number): Cell | null {
    const position = new Position(x, y);
    let result: Cell | null = null;
    this.board.forEach(function (cell) {
      if (cell.position.equals(position)) {
        result = cell;
        return;
      }
    });

    return result;
  }

  getValidMoves(from: Position): Position[] {
    const piece = this.getPiece(from);
    if (piece == null) {
      return [];
    }
    return piece.getValidMoves(from, this);
  }

  switchTurn() {
    this.turnIndex = (this.turnIndex + 1) % 2;
  }


  isInCheckAfterMove(from: Position, to: Position): boolean {
    const color = this.getPiece(from)?.getColor();
    if (color == null) {
      return false;
    }

    if (this.isCloned) {
      return false;
    }

    const simulatedBoard: Chessboard = this.clone();
    simulatedBoard.movePiece(from, to);

    let kingPosition: Position | null = null;
    for (let cell of simulatedBoard.board) {
      if (cell.piece instanceof King && cell.piece.getColor() === color) {
        kingPosition = cell.position;
        break;
      }
    }

    if (kingPosition == null) {
      return false;
    }

    const king = simulatedBoard.getPiece(kingPosition) as King;
    if (!king) {
      return false;
    }

    return king.isInCheck(kingPosition, simulatedBoard);
  }

  isCheckMate(): boolean {
    console.log("=============");
    const opponentColor = this.turnIndex === 0 ? Color.Black : Color.White;
    for (let cell of this.board) {
      if (cell.piece !== null && cell.piece.getColor() === opponentColor) {
        const moves = cell.piece.getValidMoves(cell.position, this);
        console.log(cell, moves);
        if (moves.length > 0) {
          return false;
        }
      }
    }
    return true;
  }

  clone(): Chessboard {
    const newBoard = new Chessboard();
    for (let i = 0; i < this.board.length; i++) {
      newBoard.board[i].piece = this.board[i].piece?.clone() ?? null;
    }
    newBoard.isCloned = true;
    return newBoard;
  }
}
