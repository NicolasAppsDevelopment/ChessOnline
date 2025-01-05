import { notFound } from '../error/NotFoundError'
import { Move } from '../models/Move'

export class MoveService {
  // Crée un déplacement de pièce
  public async createMove(
    gameHistory_id: number,
    promotion: boolean,
    promotionIntoWhichPiece: string,
    from_x: number,
    from_y: number,
    to_x: number,
    to_y: number,
  ): Promise<string> {
    await Move.create({ gameHistory_id: gameHistory_id, promotion: promotion, promotionIntoWhichPiece: promotionIntoWhichPiece, from_x: from_x, from_y: from_y, to_x: to_x, to_y: to_y });
  
    return "Move created"
  }
}

export const moveService = new MoveService();
