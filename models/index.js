'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const process = require('process')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.json')[env]
const db = {}

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const modelFiles = fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    )
  })

modelFiles.forEach(file => {
  const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
  db[model.name] = model
})

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.MiddleEarth.hasMany(db.Faction, { foreignKey: 'middleEarthId' });
db.Faction.belongsTo(db.MiddleEarth, { foreignKey: 'middleEarthId' });
db.Faction.hasMany(db.Unit, { foreignKey: 'factionId', onDelete: 'CASCADE' });
db.Unit.belongsTo(db.Faction, { foreignKey: 'factionId' });
db.Unit.hasOne(db.UnitStats, { foreignKey: 'unitId', onDelete: 'CASCADE' });
db.UnitStats.belongsTo(db.Unit, { foreignKey: 'unitId' });
db.Unit.hasMany(db.UnitSkill, { foreignKey: 'unitId', onDelete: 'CASCADE' });
db.UnitSkill.belongsTo(db.Unit, { foreignKey: 'unitId' });
db.Unit.hasOne(db.UnitDescription, { foreignKey: 'unitId', onDelete: 'CASCADE' });
db.UnitDescription.belongsTo(db.Unit, { foreignKey: 'unitId' });

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db