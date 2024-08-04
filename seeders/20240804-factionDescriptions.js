'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('FactionDescriptions', [
      { description: 'Gondor is a great kingdom of men, known for its strong defensive capabilities and noble heritage.', factionId: 1 },
      { description: 'Rohan is a kingdom of horse-lords, famed for their cavalry and bravery on the battlefield.', factionId: 2 },
      { description: 'Isengard is an industrialized fortress of Saruman, known for its powerful Uruk-hai and dark sorcery.', factionId: 3 },
      { description: 'Mordor is a dark land ruled by Sauron, home to legions of orcs and other dark creatures.', factionId: 4 },
      { description: 'Dwarves are stout and sturdy warriors, known for their craftsmanship and formidable fighting skills.', factionId: 5 },
      { description: 'Elves are graceful and ancient beings, known for their agility, archery skills, and magic.', factionId: 6 },

      { description: 'Space Marines are the Emperor\'s elite soldiers, genetically enhanced warriors equipped with advanced power armor.', factionId: 7 },
      { description: 'Orks are a brutal and warlike race, known for their crude technology and love of battle.', factionId: 8 },
      { description: 'Astra Militarum, also known as the Imperial Guard, are the backbone of the Imperium\'s armies, made up of countless human soldiers.', factionId: 9 },
      { description: 'Chaos Space Marines are fallen Space Marines dedicated to the dark gods of Chaos, wielding corrupted power armor and dark sorcery.', factionId: 10 },
      { description: 'Tyranids are a ravenous, alien race that consumes entire worlds, known for their bio-engineered creatures and hive mind.', factionId: 11 },
      { description: 'Necrons are ancient, undying machines with advanced technology, seeking to reclaim their dominion over the galaxy.', factionId: 12 },
      { description: 'Eldar are an ancient and enigmatic race with advanced technology and psychic powers, known for their speed and precision.', factionId: 13 },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('FactionDescriptions', null, {})
  }
}