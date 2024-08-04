const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Faction = sequelize.define('Faction', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    battleSystemId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'BattleSystems',
        key: 'id',
      },
      onDelete: 'CASCADE',
    }, 
  }, {
    timestamps: false,
  }
)

  Faction.associate = (models) => {
    Faction.belongsTo(models.BattleSystem, { foreignKey: 'battleSystemId', as: 'battleSystem' })
    Faction.hasOne(models.FactionDescription, { foreignKey: 'factionId', as: 'description', onDelete: 'CASCADE' })
  }

  return Faction
}