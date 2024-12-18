
import {Route, Controller, Post, Body, Security, Request, Get} from "tsoa";
import { roomsService } from "../services/rooms.service";
import {CreateRoomInputDTO} from "../dto/room.dto";
import express from "express";
import {getUsernameFromJWT} from "../middlewares/authentication";

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
      @Body() body: CreateRoomInputDTO,
      @Request() request: express.Request
  ) {
    const { name, password } = body;
    return await roomsService.create(name, password, (await getUsernameFromJWT(request)));
  }

  @Security("jwt")
  @Post("/join")
  public async join(
        @Body() body: CreateRoomInputDTO,
        @Request() request: express.Request
    ) {
    const { name, password } = body;
    return await roomsService.join(name, password, (await getUsernameFromJWT(request)));
  }
}
