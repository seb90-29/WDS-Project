const { Faction } = require('../../models')

// GET all factions
exports.getAllFactions = async (req, res) => {
  try {
    const factions = await Faction.findAll()
    res.json(factions)
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch factions' })
  }
}


// GET a single faction by ID
exports.getFactionById = async (req, res) => {
  try {
    const faction = await Faction.findByPk(req.params.id)
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
    const { name, battleSystemId } = req.body
    const newFaction = await Faction.create({ name, battleSystemId })
    res.status(201).json(newFaction)
  } catch (error) {
    res.status(500).json({ error: 'Unable to create faction' })
  }
}

// PUT an existing faction
exports.updateFaction = async (req, res) => {
  try {
    const { name, battleSystemId } = req.body
    const [updated] = await Faction.update({ name, battleSystemId }, {
      where: { id: req.params.id }
    })
    if (updated) {
      const updatedFaction = await Faction.findByPk(req.params.id)
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
    const { id } = req.params
    const deleted = await Faction.destroy({ where: { id } })
    if (deleted) {
      res.status(204).send()
    } else {
      res.status(404).json({ error: 'Faction not found' })
    }
  } catch (error) {
    res.status(400).json({ error: 'Unable to delete faction' })
  }
}