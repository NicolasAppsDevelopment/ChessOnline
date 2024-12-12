import {notFound} from "../error/NotFoundError";
import {Room} from "../models/room.model";
import {Chessboard} from "../models/Chessboard";

export class RoomsService {
  public boards: Map<string, Chessboard> = new Map();
  public async create(
    name: string,
    password: string
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

    const uuid = name + ":" + password;
    await Room.create({ name: name, password: password, uuid: uuid });
    this.boards.set(uuid, new Chessboard());

    return uuid;
  }

  public async getList(): Promise<string[]> {
    const room = await Room.findAll();
    return room.map((room) => {
      return room.name;
    });
  }

  public async join(
      name: string,
      password: string
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



    return room.uuid;
  }
}

export const roomsService = new RoomsService();
