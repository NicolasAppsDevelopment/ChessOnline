import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'
import { GameHistory } from './GameHistory' // Connexion à la base de données
export interface MoveAttributes {
    id?: number;
    gameHistory?: GameHistory | null;
    gameHistory_id: number;
    promotion: boolean;
    promotionIntoWhichPiece: string;
    from_x: number;
    from_y: number;
    to_x: number;
    to_y: number;
}

export class Move
    extends Model<MoveAttributes>
    implements MoveAttributes
{
    public id!: number;
    public gameHistory!: GameHistory | null;
    public gameHistory_id!: number;
    public promotion!: boolean;
    public promotionIntoWhichPiece!: string;
    public from_x!: number;
    public from_y!: number;
    public to_x!: number;
    public to_y!: number;
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
        promotion: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        promotionIntoWhichPiece: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        from_x: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        from_y: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        to_x: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        to_y: {
            type: DataTypes.INTEGER,
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
