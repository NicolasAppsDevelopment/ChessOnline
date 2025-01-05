import { Color } from './Piece'
import { Rook } from './Rook'
import { Knight } from './Knight'
import { Bishop } from './Bishop'
import { Queen } from './Queen'
import { King } from './King'
import { Pawn } from './Pawn'
import { Position } from './Position'
import { Cell } from './Cell'

export class Chessboard {
  public board: Cell[] = [];
  public colorTurn : Color = Color.White;
  public whitePlayerId : number | null = null;
  public blackPlayerId : number | null = null;
  public isCloned: boolean = false;
  public isEndGame: boolean = false;
  public winnerPlayerId: number | null = null;
  public drawAskingOpponentPlayerId: number | null = null;

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

    if (!toCell.isHighlighted) {
      return false;
    }

    toCell.piece = fromCell.piece;
    fromCell.piece = null;

    return true;
  }

  replayMovePiece(from: Position, to: Position) {
    const fromCell = this.getCellFromPosition(from);
    const toCell = this.getCellFromPosition(to);
    if (!fromCell || !toCell) return false;

    const pieceToMove = fromCell.piece;
    if (!pieceToMove) return false;

    toCell.piece = fromCell.piece;
    fromCell.piece = null;

    return true;
  }

  clearHighlights() {
    this.board.forEach(function (cell) {
      cell.isHighlighted = false;
    });
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

  getBoard(): Cell[][] {
    let board: Cell[][] = [];

    for (let x = 0; x < 8; x++) {
      board[x] = [];
    }

    this.board.forEach(function (cell) {
      board[cell.position.x][cell.position.y] = cell;
    });

    return board;
  }

  getCurrentTurnPlayerId(): number | null {
    return this.colorTurn === Color.White ? this.whitePlayerId : this.blackPlayerId;
  }
}
