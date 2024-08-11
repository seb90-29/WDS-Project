const express = require('express')
const router = express.Router()
const factionsRenderController = require('../../controllers/render/factionsRenderController');

const { validateBattleSystemId } = factionsRenderController

router.get('/new', validateBattleSystemId, factionsRenderController.renderNewFactionForm)
router.get('/battle-system/:battleSystemId/new', validateBattleSystemId, factionsRenderController.renderNewFactionForm)
router.post('/battle-system/:battleSystemId', validateBattleSystemId, factionsRenderController.handleCreateFaction)
router.get('/battle-system/:battleSystemId', validateBattleSystemId, factionsRenderController.renderFactionsByBattleSystem)
router.get('/:id', factionsRenderController.renderFactionById)
router.get('/', factionsRenderController.renderAllFactions)

module.exports = router