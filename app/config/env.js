const env = {
    database: 'MC_test',
    username: 'postgres',
    password: '5581422',
    host: 'postgres',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
module.exports = env;