import { Body, Controller, Delete, Get, Patch, Path, Post, Request, Route, Security, Tags } from 'tsoa'
import { userService } from '../services/user.service'
import { UserInputDTO, UserInputPatchDTO, UserOutputDTO } from '../dto/user.dto'
import { getUserIdFromJWT } from '../middlewares/authentication'
import express from 'express'

@Route("users")
@Tags("Users")
export class UserController extends Controller {
  // Récupère un utilisateur par ID
  @Get("{id}")
  @Security("jwt")
  public async getUserById(@Path() id: number): Promise<UserOutputDTO> {
    return userService.getPublicUserById(id);
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
  public async deleteUser(
    @Path() id: number,
    @Request() request: express.Request,
  ): Promise<void> {
    // For the moment we can only delete the logged user
    const userId = await getUserIdFromJWT(request);
    if (userId !== id) {
      let error = new Error("You can only delete your own account");
      (error as any).status = 403;
      throw error;
    }
    await userService.deleteUser(userId);
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
