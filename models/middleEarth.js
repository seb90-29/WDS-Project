const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const MiddleEarth = sequelize.define('MiddleEarth', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ForcesOfRighteousness: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ForcesOfEvil: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })

  return MiddleEarth
}