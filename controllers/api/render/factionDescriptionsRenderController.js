const { FactionDescription } = require('../../models')

exports.renderFactionDescriptionByFaction = async (req, res) => {
    try {
        const description = await FactionDescription.findOne({
            where: { factionId: req.params.factionId }
        })
        if (description) {
            res.render('factionDescriptions/detail', { description })
        } else {
            res.status(404).render('error', { error: 'Faction description not found' })
        }
    } catch (error) {
        res.status(500).render('error', { error: 'Error fetching faction description' })
    }
}