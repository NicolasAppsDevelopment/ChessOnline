import {notFound} from "../error/NotFoundError";
import {Room} from "../models/room.model";
import {Chessboard} from "../models/Chessboard";
import { v4 as uuidv4 } from 'uuid';
import {User} from "../models/user.model";
import { ListRoomItemOutputDTO } from '../dto/room.dto'

export class RoomsService {
  public boards: Map<string, Chessboard> = new Map();
  public async create(
    name: string,
    isPrivate: boolean,
    username?: string
  ): Promise<string> {
    if (name == "") {
      let error = new Error("Name is empty");
      (error as any).status = 403;
      throw error;
    }

    if (await Room.findOne({ where: { name: name } })) {
      let error = new Error("A room with this name already exists");
      (error as any).status = 403;
      throw error;
    }

    const roomUuid = uuidv4();
    await Room.create({ uuid: roomUuid, name: name, isPrivate: isPrivate });
    await User.update({ joined_room_id: roomUuid }, { where: { username: username } });

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
      uuid: string,
      username?: string
  ): Promise<string> {
    const room = await Room.findOne({ where: { uuid: uuid } });
    if (!room) {
      notFound("Room");
    }

    await User.update({ joined_room_id: room.uuid }, { where: { username: username } });

    return room.uuid;
  }

  public async getJoinedRoomUuid(
      username?: string
  ): Promise<string | null> {
    const user = await User.findOne({ where: { username: username } });
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
