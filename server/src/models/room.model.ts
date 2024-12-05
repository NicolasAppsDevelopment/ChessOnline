import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database"; // Connexion à la base de données
export interface RoomAttributes {
  id?: number;
  name: string;
  password: string;
  uuid: string;
}

export class Room
  extends Model<RoomAttributes>
  implements RoomAttributes
{
  public id!: number;
  public name!: string;
  public password!: string;
  public uuid!: string;
}

Room.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "Room",
  },
);

Room.sync();
