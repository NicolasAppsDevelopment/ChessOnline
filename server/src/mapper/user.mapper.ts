import { UserOutputDTO } from '../dto/user.dto'
import { User } from '../models/User'

export class UserMapper {
  public static toOutputDto(user: User): UserOutputDTO {
    return {
      id: user.id,
      username: user.username,
      elo: user.elo
    };
  }
}
