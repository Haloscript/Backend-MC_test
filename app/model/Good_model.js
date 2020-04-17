module.exports = (sequelize, Sequelize) => {
    return sequelize.define('good', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title :{
            type : Sequelize.STRING
        },
        price :{
            type : Sequelize.INTEGER
        },
        registrationDate: {
            type : Sequelize.DATE
        },
        owner_id :{
            type: Sequelize.INTEGER
        }
    });
};
