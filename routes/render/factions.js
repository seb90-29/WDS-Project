const express = require('express')
const router = express.Router()
const factionsRenderController = require('../controllers/render/factionsRenderController')

// Get all factions for a specific battle system
router.get('/battle-system/:battleSystemId', factionsRenderController.renderFactionsByBattleSystem)

// Get faction detail and its description
router.get('/:id', factionsRenderController.renderFactionById)

module.exports = router