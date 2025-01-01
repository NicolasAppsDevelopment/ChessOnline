import {
  Controller,
  Get,
  Post,
  Delete,
  Route,
  Path,
  Body,
  Tags,
  Patch,
  Security,
} from "tsoa";
import { moveService } from "../services/move.service";
import {
  MoveInputDTO,
  MoveOutputDTO
} from '../dto/move.dto'

@Route("moves")
@Tags("Moves")
export class MoveController extends Controller {
  // Crée un déplacement de pièce
  @Post("/")
  public async createMove(
    @Body() requestBody: MoveInputDTO,
  ): Promise<string> {
    const { gameHistory_id, isABlackPiece, whichPiece, from, to } = requestBody;
    return moveService.createMove(gameHistory_id, isABlackPiece, whichPiece, from, to);
  }

  // Supprime un déplacement de pièce
  @Delete("{id}")
  @Security("jwt")
  public async deleteMove(@Path() id: number): Promise<void> {
    await moveService.deleteMove(id);
  }
}
