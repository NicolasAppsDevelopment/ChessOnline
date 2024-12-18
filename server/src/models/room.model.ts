import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database"; // Connexion à la base de données
export interface RoomAttributes {
  uuid: string;
  name: string;
  password: string;
}

export class Room
  extends Model<RoomAttributes>
  implements RoomAttributes
{
  public uuid!: string;
  public name!: string;
  public password!: string;
}

Room.init(
  {
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
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
  },
  {
    sequelize,
    tableName: "Room",
  },
);

Room.sync();
