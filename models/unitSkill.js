const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const UnitSkill = sequelize.define('UnitSkill', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    skillName: {
      type: DataTypes.STRING,
      allowNull: false,
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

  return UnitSkill
}