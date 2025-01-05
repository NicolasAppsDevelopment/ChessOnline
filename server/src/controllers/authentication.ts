import { Body, Controller, Header, Post, Route, Security } from 'tsoa'
import { AuthenticationInputDTO } from '../dto/authentication.dto'
import { authService } from '../services/authentication.service'
import { jwtDecode } from 'jwt-decode'
import { userService } from '../services/user.service'
import { UserJwt } from '../models/UserJwt'

@Route("auth")
export class AuthenticationController extends Controller {
  @Post("/")
  public async authenticate(
    @Body() body: AuthenticationInputDTO
  ) {
    const { grant_type, username, password } = body;
    if (grant_type !== "password") {
      let error = new Error("Invalid grant_type");
      (error as any).status = 400;
      throw error;
    }
    const token = await authService.authenticate(username, password);
    return { token };
  }

  @Security("jwt")
  @Post("/refresh")
  public async refresh(
      @Header("Authorization") authorization: string,
  ) {
    const oldToken = authorization.split(" ")[1];
    const data = jwtDecode(oldToken) as UserJwt;
    const user = await userService.getUserById(data.jwtPayload.id);
    const token = await authService.generateToken(user);
    return { token };
  }
}
