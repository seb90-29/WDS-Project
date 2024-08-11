
const { BattleSystem } = require('../../models')

//GET all
exports.getAllBattleSystems = async (req, res) => {
  try {
    const battleSystems = await BattleSystem.findAll()
    res.json(battleSystems)
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch battle systems' })
  }
}

// GET battle system by id
exports.getBattleSystemById = async (req, res) => {
  try {
    const battleSystem = await BattleSystem.findByPk(req.params.id)
    if (battleSystem) {
      res.json(battleSystem)
    } else {
      res.status(404).json({ error: 'Battle system not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch battle system' })
  }
}

//POST a battle system
exports.createBattleSystem = async (req, res) => {
  try {
    const { name } = req.body
    const newBattleSystem = await BattleSystem.create({ name })
    res.status(201).json(newBattleSystem)
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(409).json({ error: 'A battle system with that name already exists.' })
    } else {
      res.status(500).json({ error: 'Unable to create battle system' })
    }
  }
}

// PUT a battle system
exports.updateBattleSystem = async (req, res) => {
  try {
    const { name } = req.body
    const [updated] = await BattleSystem.update({ name }, {
      where: { id: req.params.id }
    })
    if (updated) {
      const updatedBattleSystem = await BattleSystem.findByPk(req.params.id)
      res.json(updatedBattleSystem)
    } else {
      res.status(404).json({ error: 'Battle system not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to update battle system' })
  }
}

// DELETE a battle system
exports.deleteBattleSystem = async (req, res) => {
  try {
    const deleted = await BattleSystem.destroy({
      where: { id: req.params.id }
    })
    if (deleted) {
      res.status(204).json()
    } else {
      res.status(404).json({ error: 'Battle system not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete battle system' })
  }
}