const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const UnitStats = sequelize.define('UnitStats', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    move: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    strength: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    attacks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    wounds: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    courage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    might: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    will: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fate: {
      type: DataTypes.INTEGER,
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

  return UnitStats
}