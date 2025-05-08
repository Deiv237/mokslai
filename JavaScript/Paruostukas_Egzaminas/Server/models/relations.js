const { on } = require("events");

function modelRelations(sequelize) {
    const { user, user_secret, token } = sequelize.models;

    // --- User relations ---
    user.hasOne(user_secret, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE'});
    user_secret.belongsTo(user, { foreignKey: 'user_id' });

    user.hasOne(token, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    token.belongsTo(user, { foreignKey: 'user_id' });
}

module.exports = {modelRelations};