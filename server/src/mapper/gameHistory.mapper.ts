import { GameHistoryOutputDTO } from "../dto/gameHistory.dto";
import { GameHistory } from "../models/GameHistory";

export class GameHistoryMapper {
  public static toOutputDto(gameHistory: GameHistory): GameHistoryOutputDTO {
    return {
      id: gameHistory.id,
      startDate : gameHistory.startDate,
      endDate : gameHistory.endDate,
      room: gameHistory.room,
      blackPlayer: gameHistory.blackPlayer,
      whitePlayer: gameHistory.whitePlayer,
      winner: gameHistory.winner,
      moves: gameHistory.moves,
      isPublic: gameHistory.isPublic,
    };
  }

  public static toOutputDtoList(gameHistoryList: GameHistory[]): GameHistoryOutputDTO[] {
    return gameHistoryList.map((gameHistory) => GameHistoryMapper.toOutputDto(gameHistory));
  }
}
