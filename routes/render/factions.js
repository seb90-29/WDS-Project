const express = require('express')
const router = express.Router()
const factionsRenderController = require('../../controllers/render/factionsRenderController')

router.get('/battle-system/:battleSystemId', factionsRenderController.renderFactionsByBattleSystem)
router.get('/:id', factionsRenderController.renderFactionById)

module.exports = router