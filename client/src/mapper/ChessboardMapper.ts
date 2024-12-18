import { Cell } from "@/models/Cell";
import { getPositionFromRaw } from "@/mapper/PositionMapper";
import {getPieceFromRaw} from "@/mapper/PieceMapper";

export function getCellsFromRawBoard(board: any) {
  let cells: Cell[] = [];
  for (const cell of board) {
    cells.push(new Cell(getPositionFromRaw(cell.position), getPieceFromRaw(cell.piece), cell.isHighlighted));
  }
  return cells;
}
