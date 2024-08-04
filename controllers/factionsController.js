const { Faction, BattleSystem } = require('../models')

// GET all factions
exports.getAllFactions = async (req, res) => {
  try {
    const factions = await Faction.findAll({
      include: [BattleSystem]
    })
    res.json(factions)
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch factions' })
  }
}

// GET a single faction by ID
exports.getFactionById = async (req, res) => {
  try {
    const faction = await Faction.findByPk(req.params.id, {
      include: [BattleSystem]
    })
    if (faction) {
      res.json(faction)
    } else {
      res.status(404).json({ error: 'Faction not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch faction' })
  }
}

// POST a new faction
exports.createFaction = async (req, res) => {
  try {
    const { name, battleSystemId } = req.body;
    const newFaction = await Faction.create({ name, battleSystemId })
    res.status(201).json(newFaction);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create faction' })
  }
}

// PUT an existing faction
exports.updateFaction = async (req, res) => {
  try {
    const { name, battleSystemId } = req.body;
    const [updated] = await Faction.update({ name, battleSystemId }, {
      where: { id: req.params.id }
    })
    if (updated) {
      const updatedFaction = await Faction.findByPk(req.params.id, {
        include: [BattleSystem]
      })
      res.json(updatedFaction)
    } else {
      res.status(404).json({ error: 'Faction not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to update faction' })
  }
}

// DELETE a faction
exports.deleteFaction = async (req, res) => {
  try {
    const deleted = await Faction.destroy({
      where: { id: req.params.id }
    })
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Faction not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete faction' })
  }
}