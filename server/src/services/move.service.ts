import { notFound } from "../error/NotFoundError";
import { Move } from "../models/Move";

export class MoveService {
  // Crée un déplacement de pièce
  public async createMove(
    gameHistory_id: number,
    isABlackPiece: boolean,
    whichPiece: string,
    from: number[],
    to: number[],
  ): Promise<string> {
    await Move.create({ gameHistory_id: gameHistory_id, isABlackPiece: isABlackPiece, whichPiece: whichPiece, from: from, to: to });
  
    return "Move created"
  }

  // Supprime un déplacement de pièce
  public async deleteMove(id: number): Promise<void> {
    const move = await Move.findByPk(id);
    if (move) {
      move.destroy();
    } else {
      notFound("Move");
    }
  }
}

export const moveService = new MoveService();
