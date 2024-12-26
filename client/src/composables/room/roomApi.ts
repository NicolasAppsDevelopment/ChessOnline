import axiosInstance from '@/config/AxiosConfig';
import {
  ApiUrlAccessRoom,
  ApiUrlCreateRoom,
  ApiUrlGetRooms,
} from '@/constants/ApiUrl';
import type { CreateRoom, JoinRoom, ListRoomItem } from '@/models/Room'
import router from '@/router'

export function useRoomApi() {
  return {
    async join(room: JoinRoom): Promise<void> {
      const res = await axiosInstance.post<string>(`${ApiUrlAccessRoom}`, {
        uuid: room.uuid
      });
      router.push({path: '/game/' + res.data});
    },
    async list(): Promise<ListRoomItem[]> {
      const res = await axiosInstance.get<ListRoomItem[]>(`${ApiUrlGetRooms}`);
      return res.data;
    },
    async create(room: CreateRoom): Promise<void> {
      const res = await axiosInstance.post<string>(`${ApiUrlCreateRoom}`, {
        name: room.name,
        isPrivate: room.isPrivate,
      });
      router.push({path: '/game/' + res.data});
    }
  };
}
