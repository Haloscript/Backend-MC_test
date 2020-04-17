const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,

    pool: {
        max: env.max,
        min: env.pool.min,
        acquire: env.pool.acquire,
        idle: env.pool.idle,
    },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('../model/User_model.js')(sequelize, Sequelize);
db.good = require('../model/Good_model.js')(sequelize, Sequelize);

db.user.hasMany(db.good, { as: 'user_good', foreignKey: 'owner_id', targetKey: 'id' });
db.good.belongsTo(db.user, { as: 'good_user', foreignKey: 'owner_id', targetKey: 'id' });

module.exports = db;