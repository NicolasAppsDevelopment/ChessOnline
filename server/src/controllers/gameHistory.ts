import {
  Controller,
  Get,
  Route,
  Path,
  Tags,
  Security, Request, Put, Body
} from 'tsoa'
import { gameHistoryService } from "../services/gameHistory.service";
import {
  GameHistoryVisibilityInputPutDTO,
  GameHistoryOutputDTO
} from '../dto/gameHistory.dto'
import express from 'express'
import { getUserIdFromJWT } from '../middlewares/authentication'

@Route("gameHistories")
@Tags("GameHistories")
export class GameHistoryController extends Controller {
  // Récupère les historiques de parties liés à un utilisateur par ID
  @Get("/user/{id}")
  @Security("jwt")
  public async getGameHistoriesByUserId(
    @Path() id: number,
    @Request() request: express.Request,
  ): Promise<GameHistoryOutputDTO[]> {
    const fromUserId = await getUserIdFromJWT(request);
    if (fromUserId == id) {
      return gameHistoryService.getMyGameHistoriesByUserId(id);
    } else {
      return gameHistoryService.getPublicGameHistoriesByUserId(id);
    }
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

  @Put("visibility")
  @Security("jwt")
  public async updateGameHistory(
    @Body() requestBody: GameHistoryVisibilityInputPutDTO,
    @Request() request: express.Request
  ): Promise<void> {
    const { id, isPublic } = requestBody;
    const fromUserId = await getUserIdFromJWT(request);
    await gameHistoryService.updateGameHistoryVisibility(fromUserId, id, isPublic);
  }
}
