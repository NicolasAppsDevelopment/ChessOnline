import type { GameHistory, GameReplay } from '@/models/GameHistory'
import { useGameHistoryApi } from './historyApi'

const gameHistoryApi = useGameHistoryApi();
export function useGameHistoryService() {
  return {
    async getUserGameHistories(id: number): Promise<GameHistory[]> {
      return await gameHistoryApi.getUserGameHistories(id);
    },
    async getGameHistoryById(id: number): Promise<GameReplay> {
      return await gameHistoryApi.getGameHistoryById(id);
    },
    async getWinPercentageByUserId(id: number): Promise<number> {
      return await gameHistoryApi.getWinPercentageByUserId(id);
    },
    async getAverageGameDurationByUserId(id: number): Promise<number> {
      return await gameHistoryApi.getAverageGameDurationByUserId(id);
    },
    async getAverageGameMoveByUserId(id: number): Promise<number> {
      return await gameHistoryApi.getAverageGameMoveByUserId(id);
    },
    async getTotalGametimeByUserId(id: number): Promise<number> {
      return await gameHistoryApi.getTotalGametimeByUserId(id);
    },
    async updateGameHistoryVisibility(id: number, isPublic: boolean): Promise<void> {
      await gameHistoryApi.updateGameHistoryVisibility(id, isPublic);
    }
  };
}

