const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const UnitDescription = sequelize.define('UnitDescription', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    unitId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Units',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  })

  return UnitDescription
}