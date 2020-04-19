const GoodService = require("../services/GoodService");

const GOOD = new GoodService();

exports.addGoodOnUser = (req, res) => {
  GOOD.addGoodOnUserId(req.body)
    .then((data) =>
      res.status(200).json({
        data,
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        err: "Error",
        details: err,
      });
    });
};

exports.deleteOneGood = (req, res) => {
  GOOD.deleteGood(req.params.id)
    .then((data) =>
      res.status(200).json({
        data,
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        err: "Error",
        details: err,
      });
    });
};

exports.editGood = (req, res) => {
  GOOD.updateGood(req.body)
    .then((data) =>
      res.status(200).json({
        data,
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        err: "Error",
        details: err,
      });
    });
};
