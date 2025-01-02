import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import {GameHistory} from "./GameHistory"; // Connexion à la base de données
export interface MoveAttributes {
    id?: number;
    gameHistory?: GameHistory | null;
    gameHistory_id: number;
    isABlackPiece: boolean;
    whichPiece: string;
    from: number[];
    to: number[];
}

export class Move
    extends Model<MoveAttributes>
    implements MoveAttributes
{
    public id!: number;
    public gameHistory!: GameHistory | null;
    public gameHistory_id!: number;
    public isABlackPiece!: boolean;
    public whichPiece!: string;
    public from!: number[];
    public to!: number[];
}

Move.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        gameHistory_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        isABlackPiece: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        whichPiece: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        from: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: false,
        },
        to: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "Move",
    },
);

Move.belongsTo(GameHistory, { foreignKey: "gameHistory_id", as: "gameHistory" });
GameHistory.hasMany(Move, { sourceKey: "id", foreignKey: "gameHistory_id", as: "moves" });

Move.sync();
