const express = require('express')
const router = express.Router()
const {
  getFactionDescriptionById,
  createFactionDescription,
  updateFactionDescription,
  deleteFactionDescription
} = require('../controllers/factionDescriptionsController')

router.get('/:id', getFactionDescriptionById)
router.post('/', createFactionDescription)
router.put('/:id', updateFactionDescription)
router.delete('/:id', deleteFactionDescription)

module.exports = router
