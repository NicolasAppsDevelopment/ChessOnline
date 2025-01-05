import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import {User} from "./User";
import {Room} from "./Room";
import {Move} from "./Move"; // Connexion à la base de données
//TODO mettre date de fin
export interface GameHistoryAttributes {
    id?: number;
    startDate?: Date;
    endDate?: Date | null;
    room?: Room | null;
    room_uuid?: string | null;
    blackPlayer?: User | null;
    blackPlayer_id?: number | null;
    whitePlayer?: User | null;
    whitePlayer_id?: number | null;
    winner?: User | null;
    winner_id?: number | null;
    moves?: Move[];
    isPublic: boolean;
}

export class GameHistory
    extends Model<GameHistoryAttributes>
    implements GameHistoryAttributes
{
    public id!: number;
    public startDate!: Date;
    public endDate!: Date | null ;
    public room!: Room;
    public room_uuid!: string;
    public blackPlayer!: User | null;
    public blackPlayer_id!: number | null;
    public whitePlayer!: User | null;
    public whitePlayer_id!: number | null;
    public winner!: User | null;
    public winner_id!: number | null;
    public moves!: Move[];
    public isPublic!: boolean;
}

GameHistory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: true,
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
        isPublic: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
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
