const { FactionDescription } = require('../../models')
const fs = require('fs')
const path = require('path')

// GET all faction descriptions
exports.getAllFactionDescriptions = async (req, res) => {
  try {
    const factionDescriptions = await FactionDescription.findAll()
    res.json(factionDescriptions)
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch faction descriptions' })
  }
}

// GET a faction description by ID
exports.getFactionDescriptionById = async (req, res) => {
  try {
    const factionDescription = await FactionDescription.findByPk(req.params.id)
    if (factionDescription) {
      res.json(factionDescription)
    } else {
      res.status(404).json({ error: 'Faction description not found' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch faction description' })
  }
}

// POST a new faction description
exports.createFactionDescription = async (req, res) => {
  try {
    const { description, factionId } = req.body
    let imageUrl = ''

    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`
    }

    const newFactionDescription = await FactionDescription.create({ description, factionId, imageUrl })
    res.status(201).json(newFactionDescription)
  } catch (error) {
    res.status(400).json({ error: 'Unable to create faction description' })
  }
}

// PUT a faction description
exports.updateFactionDescription = async (req, res) => {
  try {
    const { id } = req.params
    const { description, factionId, currentImageUrl } = req.body
    let imageUrl = currentImageUrl

    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`

      // If the image has changed, delete the old image
      if (currentImageUrl && currentImageUrl !== imageUrl) {
        const oldImagePath = path.join(__dirname, '../../public', currentImageUrl)
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error('Failed to delete old image:', err)
          }
        })
      }
    }

    const [updated] = await FactionDescription.update(
      { description, factionId, imageUrl },
      { where: { id } }
    )

    if (updated) {
      const updatedFactionDescription = await FactionDescription.findByPk(id)
      res.json(updatedFactionDescription)
    } else {
      res.status(404).json({ error: 'Faction description not found' })
    }
  } catch (error) {
    res.status(400).json({ error: 'Unable to update faction description' })
  }
}

// DELETE a faction description
exports.deleteFactionDescription = async (req, res) => {
  try {
    const { id } = req.params
    const factionDescription = await FactionDescription.findByPk(id)

    if (!factionDescription) {
      return res.status(404).json({ error: 'Faction description not found' })
    }

    // Delete the associated image if it exists
    if (factionDescription.imageUrl) {
      const imagePath = path.join(__dirname, '../../public', factionDescription.imageUrl)
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Failed to delete image file:', err)
        }
      })
    }

    await factionDescription.destroy()
    res.status(204).send()
  } catch (error) {
    console.error('Error during deletion:', error)
    res.status(400).json({ error: 'Unable to delete faction description' })
  }
}