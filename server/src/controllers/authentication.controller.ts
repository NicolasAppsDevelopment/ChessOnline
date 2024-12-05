import {Route, Controller, Post, Body, Security, Header} from "tsoa";
import { AuthenticationInputDTO } from "../dto/authentication.dto";
import { authService } from "../services/authentication.service";
import {jwtDecode} from "jwt-decode";

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
    const data = jwtDecode(oldToken) as {
      username: string;
      password: string;
    };

    const token = await authService.generateToken(data.username);
    return { token };
  }
}
