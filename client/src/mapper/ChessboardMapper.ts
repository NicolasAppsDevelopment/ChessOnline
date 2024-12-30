import { Cell } from "@/models/Cell";
import { getPositionFromRaw } from "@/mapper/PositionMapper";
import {getPieceFromRaw} from "@/mapper/PieceMapper";
import {Chessboard} from "@/models/Chessboard";

export function getCellsFromRawBoard(board: any) {
  let cells: Cell[] = [];
  for (const cell of board) {
    cells.push(new Cell(getPositionFromRaw(cell.position), getPieceFromRaw(cell.piece), cell.isHighlighted));
  }
  return cells;
}

export function getChessboardFromRawBoard(rawChessboard: any) {
  let chessboard: Chessboard = new Chessboard();
  chessboard.board = getCellsFromRawBoard(rawChessboard.board);
  chessboard.colorTurn = rawChessboard.colorTurn;
  chessboard.whitePlayerId = rawChessboard.whitePlayerId;
  chessboard.blackPlayerId = rawChessboard.blackPlayerId;
  chessboard.isCloned = rawChessboard.isCloned;
  chessboard.isEndGame = rawChessboard.isEndGame;
  chessboard.winnerPlayerId = rawChessboard.winnerPlayerId;

  return chessboard;
}
