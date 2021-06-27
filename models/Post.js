const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
    {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1],
        },
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1],
        },
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "user",
            key: "id"
        }
    },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "post",
    }
);

module.exports = Comment;