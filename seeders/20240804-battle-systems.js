'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('BattleSystems', [
      {
        name: 'Middle-earth Strategy Battle Game (MESBG)',
      },
      {
        name: 'Warhammer 40,000',
      }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('BattleSystems', null, {})
  }
}