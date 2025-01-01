import { GameHistoryOutputDTO } from "../dto/gameHistory.dto";
import { GameHistory } from "../models/gameHistory.model";

export class GameHistoryMapper {
  public static toOutputDto(gameHistory: GameHistory): GameHistoryOutputDTO {
    return {
      id: gameHistory.id,
      room_uuid: gameHistory.room_uuid,
      blackPlayer_id: gameHistory.blackPlayer_id,
      whitePlayer_id: gameHistory.whitePlayer_id,
      winner_id: gameHistory.winner_id,
      moves: gameHistory.moves
    };
  }

  public static toOutputDtoList(gameHistoryList: GameHistory[]): GameHistoryOutputDTO[] {
    return gameHistoryList.map((gameHistory) => GameHistoryMapper.toOutputDto(gameHistory));
  }
}
