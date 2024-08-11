'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('BattleSystems', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BattleSystems')
  },
}