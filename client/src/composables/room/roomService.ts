import type { Room } from '@/models/Room';
import { useRoomApi } from '@/composables/room/roomApi';

const roomApi = useRoomApi();
export function useRoomService() {
  return {
    async join(room: Room): Promise<void> {
      await roomApi.join(room);
    },
    async create(room: Room): Promise<void> {
      await roomApi.create(room);
    },
    async list(): Promise<string[]> {
      return await roomApi.list();
    }
  };
}
