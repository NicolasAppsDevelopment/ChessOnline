
import {Route, Controller, Post, Body, Security, Request, Get} from "tsoa";
import { roomsService } from "../services/rooms.service";
import { CreateRoomInputDTO, JoinRoomInputDTO } from '../dto/room.dto'
import express from "express";
import { getUserIdFromJWT } from '../middlewares/authentication'

@Route("rooms")
export class RoomsController extends Controller {
  @Get("/all")
  @Security("jwt")
  public async getRooms() {
    return await roomsService.getPublicList();
  }

  @Post("/")
  @Security("jwt")
  public async createRoom(
      @Body() body: CreateRoomInputDTO,
      @Request() request: express.Request
  ) {
    const { name, isPrivate } = body;
    return await roomsService.create(name, isPrivate, (await getUserIdFromJWT(request)));
  }

  @Security("jwt")
  @Post("/join")
  public async joinRoom(
        @Body() body: JoinRoomInputDTO,
        @Request() request: express.Request
    ) {
    const { uuid } = body;
    return await roomsService.join(uuid, (await getUserIdFromJWT(request)));
  }
}
