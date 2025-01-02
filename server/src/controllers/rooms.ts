
import {Route, Controller, Post, Body, Security, Request, Get} from "tsoa";
import { roomsService } from "../services/rooms.service";
import { gameHistoryService } from "../services/gameHistory.service";
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
  ) {
    const { name, isPrivate } = body;
    const room = await roomsService.create(name, isPrivate);
    await gameHistoryService.createGameHistory(room);
    return room;
  }

  //TODO optimise ths function
  @Security("jwt")
  @Post("/join")
  public async joinRoom(
        @Body() body: JoinRoomInputDTO,
        @Request() request: express.Request
    ) {
    const { uuid } = body;
    const joiningUserId = await getUserIdFromJWT(request);
    let gameHistory = await gameHistoryService.getGameHistoriyByRoomId(uuid);
    const room_uuid = await roomsService.join(uuid, (joiningUserId));

    if (gameHistory.whitePlayer == null){
      gameHistoryService.updateGameHistory(gameHistory.id,null,null,joiningUserId);
      return room_uuid;
    }
    if (gameHistory.blackPlayer == null){
      gameHistoryService.updateGameHistory(gameHistory.id,null,joiningUserId,null);
      return room_uuid;
    }
    return room_uuid;
  }
}
