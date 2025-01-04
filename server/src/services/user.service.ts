import { UserOutputDTO } from '../dto/user.dto'
import { notFound } from "../error/NotFoundError";
import { UserMapper } from "../mapper/user.mapper";
import { User } from "../models/User";
import bcrypt from "bcrypt";

export class UserService {
  // Récupère un utilisateur par ID
  public async getUserById(id: number): Promise<User> {
    let user = await User.findByPk(id);
    if (user) {
      return user;
    } else {
      notFound("User");
    }
  }

  public async getUserByUsername(name: string): Promise<User> {
    let user = await User.findOne({where: {username: name}});
    if (user) {
      return user;
    } else {
      notFound("User");
    }
  }

  public async getLeaderboard(): Promise<User[]> {
    const users = await User.findAll({
      attributes: ['id', 'username', 'elo'],
      order: [['elo', 'DESC']]
    });
    if (users) {
      return users;
    } else {
      notFound("Leaderboard");
    }
  }

  public async updateElo(playerId: number | null, opponentId: number | null, winnerId: number | null): Promise<void> {
    if (!playerId || !opponentId) {
      return;
    }

    const player = await this.getUserById(playerId);
    const opponent = await this.getUserById(opponentId);
    const winner = winnerId == null ? null : await this.getUserById(winnerId);

    let playerGap = opponent.elo - player.elo;
    if (playerGap > 400) {
      playerGap = 400;
    } else if (playerGap < -400) {
      playerGap = -400;
    }
    let opponentGap = -playerGap;

    const expectedPlayerScore = 1 / (1 + Math.pow(10, playerGap / 400));
    const expectedOpponentScore = 1 / (1 + Math.pow(10, opponentGap / 400));
    const k = 20;

    let playerResult = 0.5;
    if (winner) {
      if (winner.id == player.id) {
        playerResult = 1;
      } else {
        playerResult = 0;
      }
    }
    let opponentResult = 0.5;
    if (winner) {
      if (winner.id == opponent.id) {
        opponentResult = 1;
      } else {
        opponentResult = 0;
      }
    }

    player.elo = Math.floor(player.elo + k * (playerResult - expectedPlayerScore));
    opponent.elo = Math.ceil(opponent.elo + k * (opponentResult - expectedOpponentScore));

    await player.save();
    await opponent.save();
  }

  // Crée un nouvel utilisateur
  public async createUser(
    username: string,
    password: string,
  ): Promise<UserOutputDTO> {
    if (await User.findOne({ where: { username: username } })) {
        let error = new Error("A user with this username already exists");
        (error as any).status = 403;
        throw error;
    }
    if (username == "" || password == "") {
      let error = new Error("Username or password is empty");
      (error as any).status = 403;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return UserMapper.toOutputDto(
      await User.create({ username: username, password: hashedPassword, elo: 400 }),
    );
  }

  // Supprime un utilisateur par ID
  public async deleteUser(id: number): Promise<void> {
    const user = await User.findByPk(id);
    if (user) {
      user.destroy();
    } else {
      notFound("User");
    }
  }

  // Met à jour un utilisateur
  public async updateUser(
    id: number,
    username?: string,
    password?: string,
  ): Promise<UserOutputDTO> {
    const user = await User.findByPk(id);
    if (user) {
      if (username) user.username = username;
      if (password) user.password = password;
      await user.save();
      return UserMapper.toOutputDto(user);
    } else {
      notFound("User");
    }
  }
}

export const userService = new UserService();
