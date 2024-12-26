import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database"; // Connexion à la base de données
export interface RoomAttributes {
  uuid: string;
  name: string;
  isPrivate: boolean;
}

export class Room
  extends Model<RoomAttributes>
  implements RoomAttributes
{
  public uuid!: string;
  public name!: string;
  public isPrivate!: boolean;
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
    isPrivate: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Room",
  },
);

Room.sync();
