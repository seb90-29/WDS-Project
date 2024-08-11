const express = require('express')
const router = express.Router()
const {
  renderAllBattleSystems,
  renderBattleSystemById,
  renderNewBattleSystemForm,
  handleCreateBattleSystem
} = require('../../controllers/render/battleSystemsRenderController')

router.get('/', renderAllBattleSystems)
router.get('/new', renderNewBattleSystemForm)
router.get('/:id', renderBattleSystemById)
router.post('/', handleCreateBattleSystem)

module.exports = router