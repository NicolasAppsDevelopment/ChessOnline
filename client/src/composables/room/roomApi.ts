import axiosInstance from '@/config/AxiosConfig';
import {
  ApiUrlAccessRoom,
  ApiUrlCreateRoom,
  ApiUrlGetRooms,
} from '@/constants/ApiUrl';
import type {Room} from "@/models/Room";
import { socket } from "@/socket";

export function useRoomApi() {
  return {
    async join(room: Room): Promise<void> {
      const res = await axiosInstance.post<string>(`${ApiUrlAccessRoom}`, {
        name: room.name,
        password: room.password,
      });
      socket.emit('JOIN_ROOM', res.data);
    },
    async list(): Promise<string[]> {
      const res = await axiosInstance.get<string[]>(`${ApiUrlGetRooms}`);
      return res.data;
    },
    async create(room: Room): Promise<void> {
      const res = await axiosInstance.post<string>(`${ApiUrlCreateRoom}`, {
        name: room.name,
        password: room.password,
      });
      socket.emit('JOIN_ROOM', res.data);
    }
  };
}
