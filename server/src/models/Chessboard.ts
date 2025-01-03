import { Color, Piece } from './Piece'
import { Rook } from './Rook'
import { Knight } from './Knight'
import { Bishop } from './Bishop'
import { Queen } from './Queen'
import { King } from './King'
import { Pawn } from './Pawn'
import { Position } from './Position'
import { Cell } from './Cell'
import { ExtraDataMove } from './ExtraDataMove'

export class Chessboard {
  public board: Cell[] = [];
  public colorTurn : Color = Color.White;
  public whitePlayerId : number | null = null;
  public blackPlayerId : number | null = null;
  public isCloned: boolean = false;
  public isEndGame: boolean = false;
  public winnerPlayerId: number | null = null;
  public drawAskingOpponentPlayerId: number | null = null;
  public onNewMatch: (() => Promise<void>) | null = null;
  public onMatchEnded: (() => Promise<void>) | null = null;
  public onPlayed: ((from: Position, to: Position, userId: number, extra: ExtraDataMove | null) => Promise<void>) | null = null;

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

    this._onNewMatch();
  }

  playMove(from: Position, to: Position, userId: number, extra: ExtraDataMove | null = null): boolean {
    if (this.getCurrentTurnPlayerId() != userId){
      return false;
    }

    const fromPositionPiece = this.getPiece(from)

    if (fromPositionPiece == null) {
      return false;
    }

    if (this.colorTurn == Color.White && fromPositionPiece.getColor() != Color.White) {
      return false;
    }
    if (this.colorTurn == Color.Black && fromPositionPiece.getColor() != Color.Black) {
      return false;
    }

    if (this.movePiece(from, to, extra)) {
      if (!this.isOpponentCanMove()) {
        this.isEndGame = true;

        if (this.isOpponentKingInCheck()) {
          this.winnerPlayerId = userId; // checkmate
        } // else pat

        this._onMatchEnded();
      }
      // TODO: Check others draw conditions (threefold repetition, only kings left)

      this.switchTurn();
    }

    this._onPlayed(from, to, userId, extra);
    return true;
  }

  movePiece(from: Position, to: Position, extra: ExtraDataMove | null = null): boolean {
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
      if (
        pieceToMove.getColor() == Color.White && to.y == 0 ||
        pieceToMove.getColor() == Color.Black && to.y == 7
      ) {
        switch (extra?.promotionPiece) {
          case "Queen":
            fromCell.piece = new Queen(pieceToMove.getColor());
            break;
          case "Rook":
            fromCell.piece = new Rook(pieceToMove.getColor());
            break;
          case "Knight":
            fromCell.piece = new Knight(pieceToMove.getColor());
            break;
          case "Bishop":
            fromCell.piece = new Bishop(pieceToMove.getColor());
            break;
          default:
            return false;
        }
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
    this.colorTurn = this.colorTurn === Color.White ? Color.Black : Color.White;
  }

  getCurrentTurnPlayerId(): number | null {
    return this.colorTurn === Color.White ? this.whitePlayerId : this.blackPlayerId;
  }

  getNextTurnPlayerColor(): Color {
    return this.colorTurn === Color.White ? Color.Black : Color.White;
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

  isOpponentCanMove(): boolean {
    const opponentColor = this.getNextTurnPlayerColor()
    for (let cell of this.board) {
      if (cell.piece !== null && cell.piece.getColor() === opponentColor) {
        const moves = cell.piece.getValidMoves(cell.position, this);
        if (moves.length > 0) {
          return true;
        }
      }
    }
    return false;
  }

  isOpponentKingInCheck(): boolean {
    const opponentColor = this.getNextTurnPlayerColor();
    for (let cell of this.board) {
      if (cell.piece !== null && cell.piece.getColor() === opponentColor && cell.piece instanceof King) {
        const kingPosition = cell.position;
        if (cell.piece.isInCheck(kingPosition, this)) {
          return true;
        }
      }
    }
    return false;
  }

  clone(): Chessboard {
    const newBoard = new Chessboard();
    for (let i = 0; i < this.board.length; i++) {
      newBoard.board[i].piece = this.board[i].piece?.clone() ?? null;
    }
    newBoard.isCloned = true;
    return newBoard;
  }

  joinGame(playerId: number): boolean {
    if (this.whitePlayerId == null || this.whitePlayerId == playerId) {
      this.whitePlayerId = playerId;
      return true;
    } else if (this.blackPlayerId == null || this.blackPlayerId == playerId) {
      this.blackPlayerId = playerId;
      return true;
    }
    return false;
  }

  leaveGame(playerId: number): void {
    if (this.whitePlayerId == playerId) {
      this.whitePlayerId = null;
    } else if (this.blackPlayerId == playerId) {
      this.blackPlayerId = null;
    }
  }

  resetGame(): boolean {
    if (!this.isEndGame) {
      return false;
    }

    for (const cell of this.board) {
      cell.piece = null;
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

    this.isEndGame = false;
    this.winnerPlayerId = null;
    this.drawAskingOpponentPlayerId = null;
    this.colorTurn = Color.White;

    this._onNewMatch();
    return true;
  }

  resign(fromUserId: number) {
    this.isEndGame = true;
    this.winnerPlayerId = this.whitePlayerId == fromUserId ? this.blackPlayerId : this.whitePlayerId;
    this._onMatchEnded();
  }

  draw(fromUserId: number): boolean {
    if (this.drawAskingOpponentPlayerId == null || this.drawAskingOpponentPlayerId != fromUserId) {
      return false;
    }

    this.isEndGame = true;
    this.winnerPlayerId = null;
    this.drawAskingOpponentPlayerId = null;
    this._onMatchEnded();
    return true;
  }

  private _onNewMatch() {
    if (this.onNewMatch != null) {
      this.onNewMatch();
    }
  }

  private _onMatchEnded() {
    if (this.onMatchEnded != null) {
      this.onMatchEnded();
    }
  }

  private _onPlayed(from: Position, to: Position, userId: number, extra: ExtraDataMove | null) {
    if (this.onPlayed != null) {
      this.onPlayed(from, to, userId, extra);
    }
  }
}
