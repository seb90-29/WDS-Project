const express = require('express')
const router = express.Router()
const renderFactionDescriptionsController = require('../../controllers/render/factionDescriptionsRenderController')

router.get('/faction/:id', renderFactionDescriptionsController.renderFactionDescriptionById)

module.exports = router