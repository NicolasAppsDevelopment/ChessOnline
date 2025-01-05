import { User } from '../models/User' // Modèle Sequelize
import jwt from 'jsonwebtoken' // Pour générer le JWT
import { notFound } from '../error/NotFoundError'
import bcrypt from 'bcrypt'
import { UserJwtPayload } from '../models/UserJwtPayload'

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
    return this.generateToken(user);
  }

    public async generateToken(data: User): Promise<string> {
      const jwtPayload: UserJwtPayload = new UserJwtPayload(data.id, data.username) ;
      return jwt.sign({jwtPayload}, JWT_SECRET, {
        expiresIn: "1h",
      });
    }
}

export const authService = new AuthenticationService();
