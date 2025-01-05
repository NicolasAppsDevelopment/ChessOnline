import { Body, Controller, Get, Post, Request, Route, Security } from 'tsoa'
import { roomsService } from '../services/rooms.service'
import { CreateRoomInputDTO, JoinRoomInputDTO } from '../dto/room.dto'
import express from 'express'
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
  ) {
    const { name, isPrivate } = body;
    return await roomsService.create(name, isPrivate);
  }

  @Security("jwt")
  @Post("/join")
  public async joinRoom(
        @Body() body: JoinRoomInputDTO,
        @Request() request: express.Request
    ) {
    const { uuid } = body;
    const joiningUserId = await getUserIdFromJWT(request);
    return await roomsService.join(uuid, (joiningUserId));
  }
}
