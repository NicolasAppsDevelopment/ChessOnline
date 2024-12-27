import {notFound} from "../error/NotFoundError";
import {Room} from "../models/room.model";
import {Chessboard} from "../models/Chessboard";
import { v4 as uuidv4 } from 'uuid';
import {User} from "../models/user.model";
import { ListRoomItemOutputDTO } from '../dto/room.dto'

export class RoomsService {
  public boards: Map<string, Chessboard> = new Map();
  public async create(
    roomName: string,
    isPrivate: boolean,
    playerId: number,
  ): Promise<string> {
    if (roomName == "") {
      let error = new Error("Name is empty");
      (error as any).status = 403;
      throw error;
    }

    if (await Room.findOne({ where: { name: roomName } })) {
      let error = new Error("A room with this name already exists");
      (error as any).status = 403;
      throw error;
    }

    const roomUuid = uuidv4();
    await Room.create({ uuid: roomUuid, name: roomName, isPrivate: isPrivate });

    this.boards.set(roomUuid, new Chessboard());

    return roomUuid;
  }

  public async getPublicList(): Promise<ListRoomItemOutputDTO[]> {
    const room = await Room.findAll({ where: { isPrivate: false } });
    return room.map((room) => {
      return { name: room.name, uuid: room.uuid } as ListRoomItemOutputDTO;
    });
  }

  public async join(
      roomUuid: string,
      playerId: number
  ): Promise<string> {
    const room = await Room.findOne({ where: { uuid: roomUuid } });
    if (!room) {
      notFound("Room");
    }

    await User.update({ joined_room_id: roomUuid }, { where: { id: playerId } });

    return room.uuid;
  }

  public async getJoinedRoomUuid(
      id: number
  ): Promise<string | null> {
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      return null;
    }
    return user.joined_room_id;
  }

  public async remove(
    uuid: string
  ): Promise<void> {
    const room = await Room.findOne({ where: { uuid: uuid } });
    if (room) {
      await room.destroy();
      roomsService.boards.delete(uuid);
    } else {
      notFound("Room");
    }
  }
}

export const roomsService = new RoomsService();
