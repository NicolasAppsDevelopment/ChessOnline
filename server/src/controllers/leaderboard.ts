import {
  Controller,
  Get,
  Route,
  Security,
} from "tsoa";
import { userService } from "../services/user.service";
import {
  UserOutputDTO
} from '../dto/user.dto'

@Route("leaderboard")
export class LeaderboardController extends Controller {
  @Get("/")
  @Security("jwt")
  public async getLeaderboard(): Promise<UserOutputDTO[]> {
    return userService.getLeaderboard();
  }
}
