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
    middleEarthId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'MiddleEarth',
        key: 'id',
      },
    },
  })

  return Faction
}