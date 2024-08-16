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
            // Since detail.ejs doesn't exist, we'll redirect to the list page
            res.redirect('/render/battle-systems')
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

exports.renderEditBattleSystemForm = async (req, res) => {
    try {
        const battleSystem = await BattleSystem.findByPk(req.params.id)
        if (!battleSystem) {
            return res.status(404).render('error', { error: 'Battle System not found' })
        }
        res.render('battleSystems/edit', { battleSystem, error: null })
    } catch (error) {
        console.error('Error fetching battle system:', error)
        res.status(500).render('battleSystems/edit', { battleSystem: null, error: 'Failed to load battle system for editing.' })
    }
}

exports.handleEditBattleSystem = async (req, res) => {
    const { name } = req.body
    try {
        const battleSystem = await BattleSystem.findByPk(req.params.id)
        if (!battleSystem) {
            res.status(404).render('error', { error: 'Battle system not found' })
        } else {
            await battleSystem.update({ name })
            res.redirect('/render/battle-systems')
        }
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(409).render('battleSystems/edit', { error: 'A battle system with that name already exists.', battleSystem: await BattleSystem.findByPk(req.params.id) })
        } else {
            res.status(500).render('error', { error: 'Error updating battle system' })
        }
    }
}

exports.handleDeleteBattleSystem = async (req, res) => {
    try {
        const battleSystem = await BattleSystem.findByPk(req.params.id)
        if (!battleSystem) {
            return res.status(404).render('error', { error: 'Battle system not found' })
        }

        await battleSystem.destroy()
        res.redirect('/render/battle-systems')
    } catch (error) {
        console.error('Error deleting battle system:', error)
        res.status(500).render('error', { error: 'Failed to delete battle system' })
    }
}