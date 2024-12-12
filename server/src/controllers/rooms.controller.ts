import {Route, Controller, Post, Body, Security, Header, Get} from "tsoa";
import { roomsService } from "../services/rooms.service";
import {CreateRoomInputDTO} from "../dto/room.dto";

@Route("rooms")
export class RoomsController extends Controller {
  @Get("/all")
  @Security("jwt")
  public async getRooms() {
    return await roomsService.getList();
  }

  @Post("/")
  @Security("jwt")
  public async createRoom(
      @Body() body: CreateRoomInputDTO
  ) {
    const { name, password } = body;
    return await roomsService.create(name, password);
  }

  @Security("jwt")
  @Post("/join")
  public async join(
        @Body() body: CreateRoomInputDTO
    ) {
    const { name, password } = body;
    return await roomsService.join(name, password);
  }
}
