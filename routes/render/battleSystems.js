const express = require('express')
const router = express.Router()
const {
  renderAllBattleSystems,
  renderBattleSystemById,
  renderNewBattleSystemForm
} = require('../../controllers/render/battleSystemsRenderController')

router.get('/', renderAllBattleSystems)
router.get('/:id', renderBattleSystemById)
router.get('/new', renderNewBattleSystemForm)

module.exports = router