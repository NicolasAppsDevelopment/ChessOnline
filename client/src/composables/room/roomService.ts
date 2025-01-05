import type { CreateRoom, ListRoomItem } from '@/models/Room'
import { useRoomApi } from '@/composables/room/roomApi'

const roomApi = useRoomApi();
export function useRoomService() {
  return {
    async join(roomUuid: string): Promise<void> {
      await roomApi.join(roomUuid);
    },
    async create(room: CreateRoom): Promise<void> {
      await roomApi.create(room);
    },
    async list(): Promise<ListRoomItem[]> {
      return await roomApi.list();
    }
  };
}
