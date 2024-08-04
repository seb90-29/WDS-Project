'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Factions', [

      { name: 'Gondor', battleSystemId: 1 },
      { name: 'Rohan', battleSystemId: 1 },
      { name: 'Isengard', battleSystemId: 1 },
      { name: 'Mordor', battleSystemId: 1 },
      { name: 'Dwarves', battleSystemId: 1 },
      { name: 'Elves', battleSystemId: 1 },


      { name: 'Space Marines', battleSystemId: 2 },
      { name: 'Orks', battleSystemId: 2 },
      { name: 'Astra Militarum', battleSystemId: 2 },
      { name: 'Chaos Space Marines', battleSystemId: 2 },
      { name: 'Tyranids', battleSystemId: 2 },
      { name: 'Necrons', battleSystemId: 2 },
      { name: 'Eldar', battleSystemId: 2 },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Factions', null, {})
  }
}