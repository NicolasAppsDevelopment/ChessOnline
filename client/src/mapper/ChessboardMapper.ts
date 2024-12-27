import { Cell } from "@/models/Cell";
import { getPositionFromRaw } from "@/mapper/PositionMapper";
import {getPieceFromRaw} from "@/mapper/PieceMapper";
import type {Chessboard} from "@/models/Chessboard";

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
  chessboard.firstPlayerTurn = rawChessboard.firstPlayerTurn;

  return chessboard;
}
