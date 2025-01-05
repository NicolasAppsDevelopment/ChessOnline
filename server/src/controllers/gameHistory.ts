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
  @Get("/user/{id}")
  @Security("jwt")
  public async getGameHistoriesByUserId(@Path() id: number): Promise<GameHistoryOutputDTO[]> {
    return gameHistoryService.getGameHistoriesByUserId(id);
  }

  // Récupère l'historique d'une partie par son id
  @Get("{id}")
  @Security("jwt")
  public async getGameHistoryById(@Path() id: number): Promise<GameHistoryOutputDTO> {
    return gameHistoryService.getGameHistoryById(id);
  }

  // Récupère le pourcentage de victoire d'un utilisateur par son ID
  @Get("/percentage/win/{id}")
  @Security("jwt")
  public async getWinPercentageByUserId(@Path() id: number): Promise<number> {
    return gameHistoryService.getWinPercentageByUserId(id);
  }
}
