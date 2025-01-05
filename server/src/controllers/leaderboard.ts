import { Controller, Get, Route, Security } from 'tsoa'
import { userService } from '../services/user.service'
import { UserRankOutputDTO } from '../dto/user.dto'

@Route("leaderboard")
export class LeaderboardController extends Controller {
  @Get("/")
  @Security("jwt")
  public async getLeaderboard(): Promise<UserRankOutputDTO[]> {
    return userService.getLeaderboard();
  }
}
