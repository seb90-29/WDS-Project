const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'public/uploads/' })

const {
  getAllFactionDescriptions,
  getFactionDescriptionById,
  createFactionDescription,
  updateFactionDescription,
  deleteFactionDescription
} = require('../../controllers/api/factionDescriptionsController')

router.get('/', getAllFactionDescriptions)
router.get('/:id', getFactionDescriptionById)
router.post('/', upload.single('image'), createFactionDescription)
router.put('/:id', upload.single('image'), updateFactionDescription)
router.delete('/:id', deleteFactionDescription)

module.exports = router
