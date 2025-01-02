import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import {User} from "./user.model";
import {Room} from "./room.model"; 
import {Move} from "./move.model"; // Connexion à la base de données
//TODO mettre date de fin
export interface GameHistoryAttributes {
    id?: number;
    date: Date;
    room?: Room | null;
    room_uuid?: string | null;
    blackPlayer?: User | null;
    blackPlayer_id?: number | null;
    whitePlayer?: User | null;
    whitePlayer_id?: number | null;
    winner?: User | null;
    winner_id?: number | null;
    moves?: Move[]; 
}

export class GameHistory
    extends Model<GameHistoryAttributes>
    implements GameHistoryAttributes
{
    public id!: number;
    public date!: Date;
    public room!: Room;
    public room_uuid!: string;
    public blackPlayer!: User | null;;
    public blackPlayer_id!: number | null;;
    public whitePlayer!: User | null;;
    public whitePlayer_id!: number | null;;
    public winner!: User | null;
    public winner_id!: number | null;
    public moves!: Move[];
}

GameHistory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        room_uuid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        blackPlayer_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        whitePlayer_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        winner_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: "GameHistory",
    },
);

GameHistory.belongsTo(Room, { foreignKey: "room_uuid", as: "room" });
GameHistory.belongsTo(User, { foreignKey: "blackPlayer_id", as: "blackPlayer" });
GameHistory.belongsTo(User, { foreignKey: "whitePlayer_id", as: "whitePlayer" });
GameHistory.belongsTo(User, { foreignKey: "winner_id", as: "winner" });

GameHistory.sync();
