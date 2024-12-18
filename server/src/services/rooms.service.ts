import {notFound} from "../error/NotFoundError";
import {Room} from "../models/room.model";
import {Chessboard} from "../models/Chessboard";
import { v4 as uuidv4 } from 'uuid';
import {User} from "../models/user.model";

export class RoomsService {
  public boards: Map<string, Chessboard> = new Map();
  public async create(
    name: string,
    password: string,
    username?: string
  ): Promise<string> {
    if (await Room.findOne({ where: { name: name } })) {
      let error = new Error("A room with this name already exists");
      (error as any).status = 403;
      throw error;
    }

    if (name == "" || password == "") {
      let error = new Error("Name or password is empty");
      (error as any).status = 403;
      throw error;
    }

    const roomUuid = uuidv4();
    await Room.create({ uuid: roomUuid, name: name, password: password });
    await User.update({ joined_room_id: roomUuid }, { where: { username: username } });

    this.boards.set(roomUuid, new Chessboard());

    return roomUuid;
  }

  public async getList(): Promise<string[]> {
    const room = await Room.findAll();
    return room.map((room) => {
      return room.name;
    });
  }

  public async join(
      name: string,
      password: string,
      username?: string
  ): Promise<string> {
    const room = await Room.findOne({ where: { name: name } });
    if (!room) {
      notFound("Room");
    }

    if (room.password !== password) {
      let error = new Error("Wrong password");
      (error as any).status = 403;
      throw error;
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
}

export const roomsService = new RoomsService();
