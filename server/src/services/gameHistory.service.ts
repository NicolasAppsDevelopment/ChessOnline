import { notFound } from "../error/NotFoundError";
import { GameHistory } from "../models/GameHistory";
import { GameHistoryOutputDTO, GameReplayOutputDTO } from '../dto/gameHistory.dto'
import { GameHistoryMapper, GameReplayMapper } from "../mapper/gameHistory.mapper";
import { Move } from "../models/Move";
import { Op } from "sequelize";
import { Room } from "../models/Room";
import { User } from "../models/User";

export class GameHistoryService {
  // Récupère les historiques de parties liés à un utilisateur par ID
  public async getPublicGameHistoriesByUserId(id: number): Promise<GameHistoryOutputDTO[]> {
    const gameHistories = GameHistoryMapper.toOutputDtoList(await GameHistory.findAll({
      where: {
        [Op.or]: [
            { blackPlayer_id: id },
            { whitePlayer_id: id },
        ],
        [Op.and]: [
          { isPublic: true },
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
        ['startDate', 'DESC'],
    ]
    }));

    if (gameHistories) {
      return gameHistories;
    } else {
      notFound("game histories of this User");
    }
  }

  public async getMyGameHistoriesByUserId(id: number): Promise<GameHistoryOutputDTO[]> {
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
        ['startDate', 'DESC'],
      ]
    }));

    if (gameHistories) {
      return gameHistories;
    } else {
      notFound("game histories of this User");
    }
  }

   // Récupère un historique de partie par son ID
   public async getGameHistoryById(id: number): Promise<GameReplayOutputDTO> {
    const gameHistory = await GameHistory.findOne({
      where: {
        id: id,
      },
      include: [
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
    });


    if (gameHistory) {
      return GameReplayMapper.toOutputDto(gameHistory);
    } else {
      notFound("Game History");
    }
  }

  // Récupère l'historique d'une partie par la room uuid
  public async getGameHistoriyByRoomId(uuid: string): Promise<GameHistory | null> {
    return  await GameHistory.findOne({
      where: {
        room_uuid: uuid,
      },
      include: [
          {
              model: Move,
              as: "moves",
          },
      ],
      order: [
        ['startDate', 'DESC'],
      ]
    });
  }

  // Crée un nouvel historique de partie
  public async createGameHistory(
    room_uuid: string,
  ): Promise<void> {
    await GameHistory.create({ room_uuid: room_uuid, startDate: new Date(), isPublic: true });
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
    endDate?: Date | null,
    winner_id?: number | null,
    blackPlayer_id?: number |  null,
    whitePlayer_id?: number | null,
  ): Promise<void> {
    const gameHistory = await GameHistory.findByPk(id);
    if (gameHistory) {
      if (endDate) gameHistory.endDate = endDate;
      if (winner_id) gameHistory.winner_id = winner_id;
      if (blackPlayer_id) gameHistory.blackPlayer_id = blackPlayer_id;
      if (whitePlayer_id) gameHistory.whitePlayer_id = whitePlayer_id;
      await gameHistory.save();
    } else {
      notFound("Game History");
    }
  }

  public async updateGameHistoryVisibility(
    fromUserId: number,
    id: number,
    isPublic: boolean,
  ): Promise<void> {
    const gameHistory = await GameHistory.findByPk(id);
    if (gameHistory) {
      if (gameHistory.blackPlayer_id !== fromUserId && gameHistory.whitePlayer_id !== fromUserId) {
        throw new Error("You are not authorized to update this game history.");
      }

      gameHistory.isPublic = isPublic;
      await gameHistory.save();
    } else {
      notFound("Game History");
    }
  }

  //Les fonctions suivantes traitants de statisiques sont séparées car si le projects venait à évoluer

  // Récupère le pourcentage de victoire d'un utilisateur par son ID
  public async getWinPercentageByUserId(id: number): Promise<number> {
    const gamesPlayed = GameHistoryMapper.toOutputDtoList(await GameHistory.findAll({
      where: {
        [Op.or]: [
            { blackPlayer_id: id },
            { whitePlayer_id: id },
        ],
      },
    }));

    const gamesWinned = GameHistoryMapper.toOutputDtoList(await GameHistory.findAll({
      where: {
        [Op.or]: [
            { blackPlayer_id: id },
            { whitePlayer_id: id },
        ],
        winner_id: id,
      },
    }));

    if (gamesPlayed.length > 0) {
      return Math.round((gamesWinned.length/gamesPlayed.length)*100);
    } else {
      notFound("game histories played by this User");
    }
  }

  // Récupère la durée moyenne des parties d'un utilisateur par son ID (en minutes)
  public async getAverageGameDurationByUserId(id: number): Promise<number> {
    const gamesPlayed = await GameHistory.findAll({
      where: {
        [Op.or]: [
            { blackPlayer_id: id },
            { whitePlayer_id: id },
        ],
        endDate: {
          [Op.ne]: null, 
        },
      },
    });

    if (!gamesPlayed.length) {
        throw new Error("No game histories found for this user.");
    }

    let totalDuration = 0;
    gamesPlayed.forEach(function (game) {
      if (game.endDate) {
        totalDuration = totalDuration + ((game.endDate.getTime() - game.startDate.getTime())/1000)/60;
      }
    }); 

    const averageDuration = totalDuration / gamesPlayed.length;

    return Math.round(averageDuration); 
  }

  // Récupère le temps de jeu d'un utilisateur par son ID (en minutes)
  public async getTotalGametimeByUserId(id: number): Promise<number> {
    const gamesPlayed = await GameHistory.findAll({
      where: {
        [Op.or]: [
            { blackPlayer_id: id },
            { whitePlayer_id: id },
        ],
        endDate: {
          [Op.ne]: null, 
        },
      },
    });

    if (!gamesPlayed.length) {
        throw new Error("No game histories found for this user.");
    }

    let totalDuration = 0;
    gamesPlayed.forEach(function (game) {
      if (game.endDate) {
        totalDuration = totalDuration + ((game.endDate.getTime() - game.startDate.getTime())/1000)/60;
      }
    });

    return Math.round(totalDuration); 
  }

  // Récupère le nombre moyen de déplacements d'un utilisateur dans ses parties par son ID
  public async getAverageGameMoveByUserId(id: number): Promise<number> {
    const gamesPlayed = await GameHistory.findAll({
      where: {
        [Op.or]: [
            { blackPlayer_id: id },
            { whitePlayer_id: id },
        ],
      },
      include: [
        {
            model: Move,
            as: "moves",
        },
      ],
    });

    if (!gamesPlayed.length) {
        throw new Error("No game histories found for this user.");
    }

    let totalMove = 0;
    gamesPlayed.forEach(function (game) {
      if (game.moves) {
        totalMove = totalMove + game.moves.length;
      }
    }); 

    const averageMove = (totalMove / gamesPlayed.length)/2;

    return Math.round(averageMove); 
  }
}

export const gameHistoryService = new GameHistoryService();
