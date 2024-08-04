const express = require('express')
const router = express.Router()
const {
  getAllFactionDescriptions,
  getFactionDescriptionById,
  createFactionDescription,
  updateFactionDescription,
  deleteFactionDescription
} = require('../controllers/factionDescriptionsController')

router.get('/', getAllFactionDescriptions)
router.get('/:id', getFactionDescriptionById)
router.post('/', createFactionDescription)
router.put('/:id', updateFactionDescription)
router.delete('/:id', deleteFactionDescription)

module.exports = router
