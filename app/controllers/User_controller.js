const UserService = require("../services/UserService");

const USER = new UserService();

exports.getAllUsers = (req, res) => {
  USER.getAllUsers(req.query.page, 10)
    .then((data) =>
      res.status(200).json({
        users: data.users,
        count: data.count,
        pages: data.pages,
        this_page: req.query.page,
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
exports.getOneUser = (req, res) => {
  USER.getOneUser(req.query.id)
    .then((user) => res.status(200).json(user))
    .catch((err) =>
      res.status(500).json({
        err: "Error",
        details: err,
      })
    );
};
