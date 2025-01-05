import {notFound} from "../error/NotFoundError";
import {Room} from "../models/Room";
import {Chessboard} from "../models/Chessboard";
import { v4 as uuidv4 } from 'uuid';
import {User} from "../models/User";
import { ListRoomItemOutputDTO } from '../dto/room.dto'
import { Position } from '../models/Position'
import { ExtraDataMove } from '../models/ExtraDataMove'
import { gameHistoryService } from './gameHistory.service'
import { moveService } from './move.service'
import { userService } from './user.service'

export class RoomsService {
  public boards: Map<string, Chessboard> = new Map();
  public async create(
    roomName: string,
    isPrivate: boolean,
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

    let newChessboard = new Chessboard();

    // set the callbacks for the chessboard
    newChessboard.onNewMatch = async () => {
      await gameHistoryService.createGameHistory(roomUuid);
    }
    newChessboard.onMatchEnded = async () => {
      await userService.updateElo(newChessboard.whitePlayerId, newChessboard.blackPlayerId, newChessboard.winnerPlayerId);

      const gameHistory = await gameHistoryService.getGameHistoriyByRoomId(roomUuid);
      if (!gameHistory) {
        return;
      }

      await gameHistoryService.updateGameHistory(gameHistory.id,new Date(),newChessboard.winnerPlayerId,null,null);
    }
    newChessboard.onPlayed = async (from: Position, to: Position, userId: number, extra: ExtraDataMove | null) => {
      const gameHistory = await gameHistoryService.getGameHistoriyByRoomId(roomUuid);
      if (!gameHistory) {
        return;
      }

      if (gameHistory.whitePlayer == null && newChessboard.whitePlayerId != null){
        await gameHistoryService.updateGameHistory(gameHistory.id,null,null,null,newChessboard.whitePlayerId);
      }
      if (gameHistory.blackPlayer == null && newChessboard.blackPlayerId != null){
        await gameHistoryService.updateGameHistory(gameHistory.id,null,null,newChessboard.blackPlayerId,null);
      }

      let promotion = false;
      let promotionIntoWhichPiece = "";
      if (extra){
        if (extra.promotionPiece){
          promotion = true;
          promotionIntoWhichPiece = extra.promotionPiece;
        } 
      }

      await moveService.createMove(gameHistory.id, promotion, promotionIntoWhichPiece, from.x, from.y, to.x, to.y);
    }

    await newChessboard.onNewMatch();
    this.boards.set(roomUuid, newChessboard);

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
