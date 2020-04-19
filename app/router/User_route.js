const userController = require("../controllers/User_controller");
module.exports = (app) => {
  app.get("/api/getUsers", userController.getAllUsers);

  app.get("/api/getOneUser/:id", userController.getOneUser);

  app.post("/api/updateUserData", userController.updateUserData);

  app.get("/api/deleteUser/:id",userController.deleteUser)
};
