import { GameHistoryOutputDTO, GameReplayOutputDTO } from "../dto/gameHistory.dto";
import { GameHistory } from "../models/GameHistory";

export class GameHistoryMapper {
  public static toOutputDto(gameHistory: GameHistory): GameHistoryOutputDTO {
    return {
      id: gameHistory.id,
      startDate : gameHistory.startDate,
      blackPlayer: gameHistory.blackPlayer,
      whitePlayer: gameHistory.whitePlayer,
      winner: gameHistory.winner,
      isPublic: gameHistory.isPublic,
    };
  }

  public static toOutputDtoList(gameHistoryList: GameHistory[]): GameHistoryOutputDTO[] {
    return gameHistoryList.map((gameHistory) => GameHistoryMapper.toOutputDto(gameHistory));
  }
}

export class GameReplayMapper {
  public static toOutputDto(gameHistory: GameHistory): GameReplayOutputDTO {
    return {
      blackPlayer: gameHistory.blackPlayer,
      whitePlayer: gameHistory.whitePlayer,
      winner: gameHistory.winner,
      moves: gameHistory.moves,
    };
  }

  public static toOutputDtoList(gameHistoryList: GameHistory[]): GameReplayOutputDTO[] {
    return gameHistoryList.map((gameHistory) => GameHistoryMapper.toOutputDto(gameHistory));
  }
}
