import axiosInstance from '@/config/AxiosConfig';
import {
  ApiUrlGetUserGameHistories,
} from '@/constants/ApiUrl'
import type { GameHistory } from '@/models/GameHistory'

export function useGameHistoryApi() {
  return {
    async getUserGameHistories(id: number): Promise<GameHistory[]> {
      const res = await axiosInstance.get(`${ApiUrlGetUserGameHistories}user/` + id);
      return res.data;
    },
    async getGameHistoryById(id: number): Promise<GameHistory> {
      const res = await axiosInstance.get(`${ApiUrlGetUserGameHistories}` + id);
      return res.data;
    },
    async getWinPercentageByUserId(id: number): Promise<number> {
      const res = await axiosInstance.get(`${ApiUrlGetUserGameHistories}percentage/win/` + id);
      return res.data;
    },
    async getAverageGameDurationByUserId(id: number): Promise<number> {
      const res = await axiosInstance.get(`${ApiUrlGetUserGameHistories}average/duration/` + id);
      return res.data;
    },
    async getAverageGameMoveByUserId(id: number): Promise<number> {
      const res = await axiosInstance.get(`${ApiUrlGetUserGameHistories}average/moves/` + id);
      return res.data;
    },
    async getTotalGametimeByUserId(id: number): Promise<number> {
      const res = await axiosInstance.get(`${ApiUrlGetUserGameHistories}total/gameTime/` + id);
      return res.data;
    },
    async updateGameHistoryVisibility(id: number, isPublic: boolean) {
      await axiosInstance.put(`${ApiUrlGetUserGameHistories}visibility`, {
        id: id,
        isPublic: isPublic
      });
    }
  };
}

