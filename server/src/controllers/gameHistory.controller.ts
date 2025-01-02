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
import { gameHistoryService } from "../services/gameHistory.service";
import {
  GameHistoryInputDTO,
  GameHistoryInputPatchDTO,
  GameHistoryOutputDTO
} from '../dto/gameHistory.dto'

@Route("gameHistories")
@Tags("GameHistories")
export class GameHistoryController extends Controller {
  // Récupère les historiques de parties liés à un utilisateur par ID
  @Get("{id}")
  @Security("jwt")
  public async getGameHistoriesByUserId(@Path() id: number): Promise<GameHistoryOutputDTO[]> {
    return gameHistoryService.getGameHistoriesByUserId(id);
  }
}
