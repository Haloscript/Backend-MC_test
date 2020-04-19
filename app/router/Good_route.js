const goodController = require("../controllers/Good_controller");
module.exports = (app) => {
  app.post("/api/addGoodOnUser", goodController.addGoodOnUser);
  //
  app.get("/api/deleteGood/:id", goodController.deleteOneGood);

  app.post("/api/editGood", goodController.editGood);

};
