module.exports = (sequelize, Sequelize) =>{
    return sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName:{
            type: Sequelize.STRING
        },
        lastName:{
            type: Sequelize.STRING
        },
        middleName:{
            type: Sequelize.STRING
        },
        position:{
            type: Sequelize.STRING
        }
    });
}