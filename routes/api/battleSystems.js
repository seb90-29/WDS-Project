const express = require('express')
const router = express.Router()
const {
  getAllBattleSystems,
  getBattleSystemById,
  createBattleSystem,
  updateBattleSystem,
  deleteBattleSystem
} = require('../../controllers/api/battleSystemsController')

router.get('/', getAllBattleSystems)
router.get('/:id', getBattleSystemById)
router.post('/', createBattleSystem)
router.put('/:id', updateBattleSystem)
router.delete('/:id', deleteBattleSystem)

module.exports = router