const db = require("../config/db_config.js");
const User = db.user;
const Good = db.good;

module.exports = class UserService {
  /**
   *Получение всех юзеров с бд с пагинацией
   * @param {number}page
   * @param {number}limit
   */
  getAllUsers(page, limit) {
    return new Promise((resolve, reject) => {
      let offset = (page - 1) * limit;
      User.findAndCountAll({
        limit: limit,
        offset: offset,
        include: [
          {
            model: Good,
            as: "user_good",
            // duplicating: false,
          },
        ],
        order: [["createdAt", "DESC"]],
      })
        .then((data) => {
          let current_data = data.rows.map((user) => {
            user.dataValues.good_count = user.user_good.length;
            user.dataValues.total_price = user.user_good.reduce(
              (prev, current) => prev + current.price,
              0
            );
            user.dataValues.fullName = `${
              user.lastName
            }.${user.firstName.charAt(0)}${
              user.middleName ? "." : ""
            }${user.middleName.charAt(0)}`;
            return user;
          });
          let pages = Math.ceil(data.count / limit);
          const sendData = {
            users: current_data,
            count: data.count,
            pages: pages,
          };
          resolve(sendData);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  /**
   *
   * @param {number}id
   */
  getOneUser(id) {
    return new Promise((resolve, reject) => {
      User.findOne({
        where: {
          id: id,
        },
        include: [
          {
            model: Good,
            as: "user_good",
          },
        ],
      })
        .then((user) => resolve(user))
        .catch((err) => reject(err));
    });
  }
};
