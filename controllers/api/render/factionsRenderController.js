const { Faction, FactionDescription, BattleSystem } = require('../../models')

exports.renderFactionsByBattleSystem = async (req, res) => {
    try {
        const battleSystemId = req.params.battleSystemId
        const factions = await Faction.findAll({
            where: { battleSystemId: battleSystemId }
        })
        const battleSystem = await BattleSystem.findByPk(battleSystemId)
        res.render('factions/index', { factions, battleSystem })
    } catch (error) {
        res.status(500).render('error', { error: 'Error fetching factions' })
    }
};

exports.renderFactionById = async (req, res) => {
    try {
        const faction = await Faction.findByPk(req.params.id, {
            include: [FactionDescription]
        })
        if (faction) {
            res.render('factions/detail', { faction, description: faction.FactionDescription })
        } else {
            res.status(404).render('error', { error: 'Faction not found' })
        }
    } catch (error) {
        res.status(500).render('error', { error: 'Error fetching faction details' })
    }
}