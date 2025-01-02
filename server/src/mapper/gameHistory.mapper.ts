import { GameHistoryOutputDTO } from "../dto/gameHistory.dto";
import { GameHistory } from "../models/gameHistory.model";

export class GameHistoryMapper {
  public static toOutputDto(gameHistory: GameHistory): GameHistoryOutputDTO {
    return {
      id: gameHistory.id,
      date : gameHistory.date,
      room: gameHistory.room,
      blackPlayer: gameHistory.blackPlayer,
      whitePlayer: gameHistory.whitePlayer,
      winner: gameHistory.winner,
      moves: gameHistory.moves
    };
  }

  public static toOutputDtoList(gameHistoryList: GameHistory[]): GameHistoryOutputDTO[] {
    return gameHistoryList.map((gameHistory) => GameHistoryMapper.toOutputDto(gameHistory));
  }
}
