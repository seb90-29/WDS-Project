const { Faction, FactionDescription, BattleSystem } = require('../../models')

exports.renderAllBattleSystems = async (req, res) => {
    try {
        const battleSystems = await BattleSystem.findAll()
        res.render('battleSystems/index', { battleSystems })
    } catch (error) {
        res.status(500).render('error', { error: 'Unable to fetch battle systems' })
    }
}

exports.renderBattleSystemById = async (req, res) => {
    try {
        const battleSystem = await BattleSystem.findByPk(req.params.id)
        if (battleSystem) {
            res.render('battleSystems/detail', { battleSystem })
        } else {
            res.status(404).render('error', { error: 'Battle system not found' })
        }
    } catch (error) {
        res.status(500).render('error', { error: 'Error fetching battle system' })
    }
}

exports.renderNewBattleSystemForm = (req, res) => {
    res.render('battleSystems/new')
}

exports.handleCreateBattleSystem = async (req, res) => {
    try {
      const { name } = req.body;
      await BattleSystem.create({ name })
      res.redirect('/render/battle-systems')
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        res.status(409).render('error', { error: 'A battle system with that name already exists.' })
      } else {
        res.status(500).render('error', { error: 'Error creating new battle system' })
      }
    }
  }