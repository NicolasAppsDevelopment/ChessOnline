import {
  Controller,
  Get,
  Post,
  Delete,
  Route,
  Path,
  Body,
  Tags,
  Patch,
  Security,
} from "tsoa";
import { userService } from "../services/user.service";
import {
  UserInputDTO,
  UserInputPatchDTO,
  UserOutputDTO,
} from "../dto/user.dto";
import {User} from "../models/user.model";

@Route("users")
@Tags("Users")
export class UserController extends Controller {
  // Récupère un utilisateur par ID
  @Get("{id}")
  @Security("jwt")
  public async getUserById(@Path() id: number): Promise<UserOutputDTO> {
    return userService.getUserById(id);
  }

  // Récupère le rang d'un utilisateur par ID
  @Get("{id}/rank")
  @Security("jwt")
  public async getUserRank(@Path() id: number): Promise<number | undefined> {
    return userService.getUserRank(id);
  }

  // Crée un nouvel utilisateur
  @Post("/")
  public async createUser(
    @Body() requestBody: UserInputDTO,
  ): Promise<UserOutputDTO> {
    const { username, password } = requestBody;
    return userService.createUser(username, password);
  }

  // Supprime un utilisateur par ID
  @Delete("{id}")
  @Security("jwt")
  public async deleteUser(@Path() id: number): Promise<void> {
    await userService.deleteUser(id);
  }

  // Met à jour un utilisateur par ID
  @Patch("{id}")
  @Security("jwt")
  public async updateUser(
    @Path() id: number,
    @Body() requestBody: UserInputPatchDTO,
  ): Promise<UserOutputDTO> {
    const { username, password } = requestBody;
    return userService.updateUser(id, username, password);
  }
}
