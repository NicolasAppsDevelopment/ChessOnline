import { Rook } from '@/models/Rook'
import { Knight } from '@/models/Knight'
import { Bishop } from '@/models/Bishop'
import { Queen } from '@/models/Queen'
import { King } from '@/models/King'
import { Pawn } from '@/models/Pawn'

export function getPieceFromRaw(piece: any) {
  if (piece == null) {
    return null;
  }

  switch (piece.name) {
    case "Rook":
      return new Rook(piece.color);
    case "Knight":
      return new Knight(piece.color);
    case "Bishop":
      return new Bishop(piece.color);
    case "Queen":
      return new Queen(piece.color);
    case "King":
      return new King(piece.color);
    case "Pawn":
      return new Pawn(piece.color);
    default:
      return null;
  }
}
