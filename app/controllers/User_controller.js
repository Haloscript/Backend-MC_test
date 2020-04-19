const UserService = require("../services/UserService");

const USER = new UserService();
exports.getAllUsers = (req, res) => {
  console.log("LOL<<<", req.query);
  USER.getAllUsers(
    req.query.page,
    10,
    req.query.filter,
    req.query.sorted,
    req.query.sortPrice,
    req.query.sortCount
  )
    .then((data) =>
      res.status(200).json({
        users: data.users,
        count: data.count,
        pages: data.pages,
        this_page: Number(req.query.page),
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
  USER.getOneUser(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch((err) =>
      res.status(500).json({
        err: "Error",
        details: err,
      })
    );
};

exports.updateUserData = (req, res) => {
  USER.updateAllUserData(req.body)
    .then((user) => res.status(200).json(user))
    .catch((err) =>
      res.status(500).json({
        err: "Error",
        details: err,
      })
    );
};

exports.deleteUser = (req, res) => {
  USER.deleteOneUser(req.params.id)
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
