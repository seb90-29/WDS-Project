const { FactionDescription } = require('../../models')

// GET all faction descriptions
exports.getAllFactionDescriptions = async (req, res) => {
  try {
    const factionDescriptions = await FactionDescription.findAll()
    res.json(factionDescriptions)
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch faction descriptions' })
  }
}

// GET a faction description by ID
exports.getFactionDescriptionById = async (req, res) => {
  try {
    const factionDescription = await FactionDescription.findByPk(req.params.id)
    if (factionDescription) {
      res.json(factionDescription)
    } else {
      res.status(404).json({ error: 'Faction description not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch faction description' })
  }
}

// POST a new faction description
exports.createFactionDescription = async (req, res) => {
  try {
    const { description, factionId } = req.body;
    const newFactionDescription = await FactionDescription.create({ description, factionId });
    res.status(201).json(newFactionDescription);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create faction description' })
  }
}

// PUT a faction description
exports.updateFactionDescription = async (req, res) => {
  try {
    const { id } = req.params
    const { description, factionId } = req.body
    const [updated] = await FactionDescription.update(
      { description, factionId },
      { where: { id } }
    )
    if (updated) {
      const updatedFactionDescription = await FactionDescription.findByPk(id);
      res.json(updatedFactionDescription)
    } else {
      res.status(404).json({ error: 'Faction description not found' })
    }
  } catch (error) {
    res.status(400).json({ error: 'Unable to update faction description' })
  }
}

// DELETE a faction description
exports.deleteFactionDescription = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await FactionDescription.destroy({ where: { id } })
    if (deleted) {
      res.status(204).send()
    } else {
      res.status(404).json({ error: 'Faction description not found' })
    }
  } catch (error) {
    res.status(400).json({ error: 'Unable to delete faction description' })
  }
}