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

  // Récupère l'historique d'une partie par la room uuid
  @Get("room/{uuid}")
  @Security("jwt")
  public async getGameHistoriyByRoomId(@Path() uuid: string): Promise<GameHistoryOutputDTO> {
    return gameHistoryService.getGameHistoriyByRoomId(uuid);
  }

  // Crée un nouvel historique de partie
  @Post("/")
  public async createGameHistory(
    @Body() requestBody: GameHistoryInputDTO,
  ): Promise<string> {
    const { room_uuid } = requestBody;
    return gameHistoryService.createGameHistory(room_uuid);
  }

  // Supprime un nouvel historique de partie
  @Delete("{id}")
  @Security("jwt")
  public async deleteGameHistory(@Path() id: number): Promise<void> {
    await gameHistoryService.deleteGameHistory(id);
  }

  // Met à jour un historique de partie par ID
  @Patch("{id}")
  @Security("jwt")
  public async updateGameHistory(
    @Path() id: number,
    @Body() requestBody: GameHistoryInputPatchDTO,
  ): Promise<string> {
    const { winner_id, blackPlayer_id, whitePlayer_id } = requestBody;
    return gameHistoryService.updateGameHistory(id, winner_id, blackPlayer_id, whitePlayer_id);
  }
}
