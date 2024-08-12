const { Faction, FactionDescription, BattleSystem } = require('../../models')

exports.renderFactionDescriptionById = async (req, res) => {
    try {
        const factionId = req.params.id;
        const faction = await Faction.findByPk(factionId, {
            include: [{
                model: FactionDescription,
                as: 'description'
            }]
        })

        console.log(faction)

        if (faction && faction.description) {
            res.render('factions/detail', {
                faction: faction,
                description: faction.description
            });
        } else {
            res.status(404).render('error', { error: 'Faction or description not found' })
        }
    } catch (error) {
        res.status(500).render('error', { error: 'Error fetching faction description' })
    }
}