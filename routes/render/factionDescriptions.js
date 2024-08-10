const express = require('express')
const router = express.Router()
const {
  renderFactionDescriptionByFaction
} = require('../../controllers/render/factionDescriptionsRenderController')

router.get('/faction/:factionId', renderFactionDescriptionByFaction)

module.exports = router