const express = require('express')
const router = express.Router()
const {
  renderAllBattleSystems,
  renderBattleSystemById,
  renderNewBattleSystemForm,
  handleCreateBattleSystem,
  handleDeleteBattleSystem
} = require('../../controllers/render/battleSystemsRenderController')

const { renderEditBattleSystemForm, handleEditBattleSystem } = require('../../controllers/render/battleSystemsRenderController')

router.get('/', renderAllBattleSystems)
router.get('/new', renderNewBattleSystemForm)
router.get('/:id', renderBattleSystemById)
router.post('/', handleCreateBattleSystem)
router.get('/:id/edit', renderEditBattleSystemForm)
router.post('/:id/edit', handleEditBattleSystem)
router.post('/:id/delete', handleDeleteBattleSystem)

module.exports = router