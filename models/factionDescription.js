const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const FactionDescription = sequelize.define('FactionDescription', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        factionId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Factions',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
    }, {
        timestamps: false,
    })

    FactionDescription.associate = (models) => {
        FactionDescription.belongsTo(models.Faction, { foreignKey: 'factionId', as: 'faction' })
    }

    return FactionDescription
}