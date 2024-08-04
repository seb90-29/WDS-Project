const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const BattleSystem = sequelize.define('BattleSystem', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  BattleSystem.associate = (models) => {
    BattleSystem.hasMany(models.Faction, { foreignKey: 'battleSystemId', onDelete: 'CASCADE' })
  }

  return BattleSystem
}