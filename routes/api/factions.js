const express = require('express')
const router = express.Router()
const {
  getAllFactions,
  getFactionById,
  createFaction,
  updateFaction,
  deleteFaction
} = require('../../controllers/api/factionsController')

router.get('/', getAllFactions)
router.get('/:id', getFactionById)
router.post('/', createFaction)
router.put('/:id', updateFaction)
router.delete('/:id', deleteFaction)

module.exports = router