import {
  Controller,
  Get,
  Route,
  Path,
  Tags,
  Security,
} from "tsoa";
import { gameHistoryService } from "../services/gameHistory.service";
import {
  GameReplayOutputDTO,
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
  public async getGameHistoryById(@Path() id: number): Promise<GameReplayOutputDTO> {
    return gameHistoryService.getGameHistoryById(id);
  }

  // Récupère le pourcentage de victoire d'un utilisateur par son ID
  @Get("/percentage/win/{id}")
  @Security("jwt")
  public async getWinPercentageByUserId(@Path() id: number): Promise<number> {
    return gameHistoryService.getWinPercentageByUserId(id);
  }

  // Récupère la durée moyenne des parties d'un utilisateur par son ID
  @Get("/average/duration/{id}")
  @Security("jwt")
  public async getAverageGameDurationByUserId(@Path() id: number): Promise<number> {
    return gameHistoryService.getAverageGameDurationByUserId(id);
  }
  // Récupère le nombre moyen de déplacements d'un utilisateur dans ses parties par son ID
  @Get("/average/moves/{id}")
  @Security("jwt")
  public async getAverageGameMoveByUserId(@Path() id: number): Promise<number> {
    return gameHistoryService.getAverageGameMoveByUserId(id);
  }

  // Récupère le temps de jeu d'un utilisateur par son ID (en minutes)
  @Get("/total/gameTime/{id}")
  @Security("jwt")
  public async getTotalGametimeByUserId(@Path() id: number): Promise<number> {
    return gameHistoryService.getTotalGametimeByUserId(id);
  }

}
