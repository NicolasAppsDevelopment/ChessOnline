import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import {Room} from "./Room"; // Connexion à la base de données
export interface UserAttributes {
    id?: number;
    username: string;
    password: string;
    joined_room?: Room | null;
    joined_room_id?: string | null;
    elo: number;
}

export class User
    extends Model<UserAttributes>
    implements UserAttributes
{
    public id!: number;
    public username!: string;
    public password!: string;
    public joined_room!: Room | null;
    public joined_room_id!: string | null;
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
        joined_room_id: {
            type: DataTypes.STRING,
            allowNull: true,
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

User.belongsTo(Room, { foreignKey: "joined_room_id", as: "joined_room" });

User.sync();
