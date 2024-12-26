import { UserOutputDTO } from "../dto/user.dto";
import { notFound } from "../error/NotFoundError";
import { UserMapper } from "../mapper/user.mapper";
import { User } from "../models/user.model";
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

  public async getLeaderboard(): Promise<UserOutputDTO[]> {
    const users = await User.findAll({
      attributes: ['id', 'username', 'elo'],
      order: [['elo', 'DESC']],
      limit: 10,
    });
    if (users) {
      return users.map(UserMapper.toOutputDto);
    } else {
      notFound("User");
    }
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
      await User.create({ username: username, password: hashedPassword, elo: 0 }),
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
