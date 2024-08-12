const { Faction, FactionDescription, BattleSystem } = require('../../models')
const fs = require('fs')
const path = require('path')

exports.validateBattleSystemId = (req, res, next) => {
    const battleSystemId = req.params.battleSystemId || req.query.battleSystemId;
    console.log("battleSystemId:", battleSystemId)
    if (!battleSystemId) {
        console.error('No battleSystemId provided:', req.originalUrl);
        return res.status(400).render('error', { error: 'Battle system ID is required' })
    }
    if (!/^\d+$/.test(battleSystemId)) {
        console.error('Invalid battleSystemId:', battleSystemId);
        return res.status(400).render('error', { error: 'Invalid battle system ID provided' })
    }
    next()
}

exports.renderFactionsByBattleSystem = async (req, res) => {
    const battleSystemId = req.params.battleSystemId
    try {
        const battleSystem = await BattleSystem.findByPk(battleSystemId)
        const factions = await Faction.findAll({
            where: { battleSystemId: battleSystemId }
        })
        if (!battleSystem) {
            console.error('Battle system not found with ID:', battleSystemId)
            return res.status(404).render('error', { error: 'Battle system not found' })
        }
        res.render('factions/index', { factions, battleSystem })
    } catch (error) {
        console.error('Error fetching factions for battleSystemId:', battleSystemId, error)
        res.status(500).render('error', { error: 'Error fetching factions' })
    }
}

exports.renderFactionById = async (req, res) => {
    try {
        const faction = await Faction.findByPk(req.params.id, {
            include: [{
                model: FactionDescription,
                as: 'description'
            }]
        })
        if (!faction) {
            console.error('Faction not found with ID:', req.params.id)
            return res.status(404).render('error', { error: 'Faction not found' })
        }
        res.render('factions/detail', { faction, description: faction.description })
    } catch (error) {
        console.error('Error fetching faction details with ID:', req.params.id, error)
        res.status(500).render('error', { error: 'Error fetching faction details' })
    }
}

exports.renderNewFactionForm = (req, res) => {
    const battleSystemId = req.params.battleSystemId || req.query.battleSystemId
    res.render('factions/new', { battleSystemId })
}

exports.handleCreateFaction = async (req, res) => {
    const { name, description } = req.body
    const battleSystemId = req.params.battleSystemId || req.body.battleSystemId
    let imagePath = ''

    if (req.file) {
        imagePath = `/uploads/${req.file.filename}`
    }

    try {
        const newFaction = await Faction.create({
            name, 
            imageUrl: imagePath,
            battleSystemId
        })
        await FactionDescription.create({
            description,
            factionId: newFaction.id,
            imageUrl: imagePath
        })

        res.redirect('/render/factions/battle-system/' + battleSystemId)
    } catch (error) {
        console.error('Error creating new faction:', error)
        res.status(500).render('error', { error: 'Failed to create new faction' })
    }
}

exports.renderAllFactions = async (req, res) => {
    const battleSystemId = req.query.battleSystemId
    try {
        const battleSystem = await BattleSystem.findByPk(battleSystemId)
        const factions = await Faction.findAll({
            where: { battleSystemId: battleSystemId }
        })
        if (!battleSystem) {
            return res.status(404).render('error', { error: 'Battle system not found' })
        }
        res.render('factions/index', { factions, battleSystem })
    } catch (error) {
        console.error('Error fetching factions:', error)
        res.status(500).render('error', { error: 'Error fetching factions' })
    }
}

exports.renderEditFactionForm = async (req, res) => {
    try {
        const faction = await Faction.findByPk(req.params.id, {
            include: [{ model: FactionDescription, as: 'description' }]
        })

        if (!faction) {
            return res.status(404).render('error', { error: 'Faction not found' })
        }

        res.render('factions/edit', { faction })
    } catch (error) {
        console.error('Error fetching faction for edit:', error)
        res.status(500).render('error', { error: 'Error fetching faction for edit' })
    }
}

exports.handleEditFaction = async (req, res) => {
    const { name, description } = req.body
    let imagePath = req.body.currentImageUrl
    if (req.file) {
        imagePath = `/uploads/${req.file.filename}`
    }

    try {
        const faction = await Faction.findByPk(req.params.id)

        if (!faction) {
            return res.status(404).render('error', { error: 'Faction not found' })
        }

        await faction.update({ name, imageUrl: imagePath })
        await FactionDescription.update(
            { description, imageUrl: imagePath },
            { where: { factionId: faction.id } }
        )

        res.redirect(`/render/factions/${faction.id}`)
    } catch (error) {
        console.error('Error updating faction:', error)
        res.status(500).render('error', { error: 'Failed to update faction' })
    }
}

exports.handleDeleteFaction = async (req, res) => {
    try {
        const faction = await Faction.findByPk(req.params.id, {
            include: [{ model: FactionDescription, as: 'description' }]
        })

        if (!faction) {
            return res.status(404).render('error', { error: 'Faction not found' })
        }

        if (faction.description && faction.description.imageUrl) {
            const imagePath = path.join(__dirname, '../../public', faction.description.imageUrl)
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Failed to delete image file:', err)
                }
            })
        }

        await faction.destroy()
        res.redirect('/render/factions/battle-system/' + faction.battleSystemId)
    } catch (error) {
        console.error('Error deleting faction:', error)
        res.status(500).render('error', { error: 'Failed to delete faction' })
    }
}