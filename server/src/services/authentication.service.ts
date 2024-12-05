import {User} from "../models/user.model"; // Modèle Sequelize
import jwt from "jsonwebtoken"; // Pour générer le JWT
import {notFound} from "../error/NotFoundError";
import bcrypt from "bcrypt";

export const JWT_SECRET = process.env.JWT_SECRET ?? "your_jwt_secret_key"; // Clé secrète pour signer le token

export class AuthenticationService {
  public async authenticate(
    username: string,
    password: string
  ): Promise<string> {
    // Recherche l'utilisateur dans la base de données
    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw notFound("User");
    }

    // Vérifie si le mot de passe est correct
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      let error = new Error("Wrong password");
      (error as any).status = 403;
      throw error;
    }

    // Si l'utilisateur est authentifié, on génère un JWT
    return this.generateToken(username);
  }

    public async generateToken(username: string): Promise<string> {
        return jwt.sign({username}, JWT_SECRET, {
          expiresIn: "1h",
        });
    }
}

export const authService = new AuthenticationService();
