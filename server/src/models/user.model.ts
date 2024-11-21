import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database"; // Connexion à la base de données
export interface UserAttributes {
  id?: number;
  username: string;
  password: string;
  elo: number;
}

export class User
  extends Model<UserAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public password!: string;
  public elo!: number;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    elo: {
      type: DataTypes.NUMBER,
      allowNull: false,
      defaultValue: "user",
    },
  },
  {
    sequelize,
    tableName: "User",
  },
);

User.sync();
