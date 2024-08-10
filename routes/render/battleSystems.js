const express = require('express')
const router = express.Router()
const {
  renderAllBattleSystems,
  renderBattleSystemById
} = require('../controllers/render/battleSystemsRenderController')

router.get('/', renderAllBattleSystems)
router.get('/:id', renderBattleSystemById)

module.exports = router