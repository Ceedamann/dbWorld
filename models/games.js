module.exports = function (sequelize, DataTypes) {

    var Game = sequelize.define("Game", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        platform: {
            type: DataTypes.STRING,
            allowNull: false
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Game;

}