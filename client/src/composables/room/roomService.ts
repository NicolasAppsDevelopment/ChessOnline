import type { CreateRoom, JoinRoom, ListRoomItem } from '@/models/Room'
import { useRoomApi } from '@/composables/room/roomApi';

const roomApi = useRoomApi();
export function useRoomService() {
  return {
    async join(room: JoinRoom): Promise<void> {
      await roomApi.join(room);
    },
    async create(room: CreateRoom): Promise<void> {
      await roomApi.create(room);
    },
    async list(): Promise<ListRoomItem[]> {
      return await roomApi.list();
    }
  };
}
