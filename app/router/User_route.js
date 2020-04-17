const userController = require('../controllers/User_controller');
module.exports = (app) =>{
    app.get('/api/getUsers', userController.getAllUsers);

    app.get('/api/getOneUser', userController.getOneUser)
    //
    // app.post('/api/updateShop/:id', shopController.updateShop);
}