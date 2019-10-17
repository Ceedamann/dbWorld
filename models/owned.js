module.exports = function(sequelize, DataTypes) {
  var Owned = sequelize.define("Owned", {
    game: {
      type: DataTypes.STRING,
      allowNull: false
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  Owned.associate = function(models) {
    Owned.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Owned.belongsTo(models.Game, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Owned;
};
