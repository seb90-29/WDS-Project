const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const Unit = sequelize.define('Unit', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
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

  return Unit
}