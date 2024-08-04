'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('FactionDescriptions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      factionId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Factions',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('FactionDescriptions')
  },
}