import { notFound } from "../error/NotFoundError";
import { GameHistory } from "../models/gameHistory.model";
import { GameHistoryOutputDTO } from '../dto/gameHistory.dto'
import { GameHistoryMapper } from "../mapper/gameHistory.mapper";
import { Move } from "../models/move.model";
import { Op } from "sequelize";
import { DATE } from "sequelize";
import { now } from "sequelize/types/utils";
import { Room } from "../models/room.model";
import { User } from "../models/user.model";

export class GameHistoryService {
  // Récupère les historiques de parties liés à un utilisateur par ID
  public async getGameHistoriesByUserId(id: number): Promise<GameHistoryOutputDTO[]> {
    const gameHistories = GameHistoryMapper.toOutputDtoList(await GameHistory.findAll({
      where: {
        [Op.or]: [
            { blackPlayer_id: id },
            { whitePlayer_id: id },
        ],
      },
      include: [
          {
            model: Room,
            as: "room",
          },
          {
            model: User,
            as: "blackPlayer",
          },
          {
            model: User,
            as: "whitePlayer",
          },
          {
            model: User,
            as: "winner",
          },
          {
            model: Move,
            as: "moves",
          },
      ],
      order: [
        ['date', 'DESC'],
    ]
    }));

    if (gameHistories) {
      return gameHistories;
    } else {
      notFound("game histories of this User");
    }
  }

  // Récupère l'historique d'une partie par la room uuid
  public async getGameHistoriyByRoomId(uuid: string): Promise<GameHistoryOutputDTO> {
    const gameHistory = await GameHistory.findOne({
      where: {
        room_uuid: uuid,
    },
      include: [
          {
              model: Move,
              as: "moves",
          },
      ],
    });

    if (gameHistory) {
      return gameHistory;
    } else {
      notFound("game history of this room");
    }
  }

  // Crée un nouvel historique de partie
  public async createGameHistory(
    room_uuid: string,
  ): Promise<string> {
    if (await GameHistory.findOne({ where: { room_uuid: room_uuid } })) {
        let error = new Error("A game history with this room_uuid already exists");
        (error as any).status = 403;
        throw error;
    }
    //TODO mettre l'heure en france
    await GameHistory.create({ room_uuid: room_uuid, date: new Date() });
  
    return "Game History created"
  }

  // Supprime un historique de partie par ID
  public async deleteGameHistory(id: number): Promise<void> {
    const gameHistory = await GameHistory.findByPk(id);
    if (gameHistory) {
      gameHistory.destroy();
    } else {
      notFound("Game History");
    }
  }

  // Met à jour un historique de partie
  public async updateGameHistory(
    id: number,
    winner_id?: number | null,
    blackPlayer_id?: number |  null,
    whitePlayer_id?: number | null,
  ): Promise<string> {
    const gameHistory = await GameHistory.findByPk(id);
    if (gameHistory) {
      if (winner_id) gameHistory.winner_id = winner_id;
      if (blackPlayer_id) gameHistory.blackPlayer_id = blackPlayer_id;
      if (whitePlayer_id) gameHistory.whitePlayer_id = whitePlayer_id;
      await gameHistory.save();
      return "Game History updated";
    } else {
      notFound("Game History");
    }
  }
}

export const gameHistoryService = new GameHistoryService();
