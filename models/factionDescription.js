const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const FactionDescription = sequelize.define('FactionDescription', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    factionId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Factions',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  })

  FactionDescription.associate = (models) => {
    FactionDescription.belongsTo(models.Faction, { foreignKey: 'factionId', as: 'faction' })
  }

  return FactionDescription
}