const db = require("../config/db_config.js");
const User = db.user;
const Good = db.good;

module.exports = class UserService {
  /**
   * олучение всех юзеров с бд с пагинацией и сортировкой
   * @param page
   * @param limit
   * @param filter
   * @param sorted
   * @param sortPrice
   * @param sortCount
   * @returns {Promise<unknown>}
   */
  getAllUsers(page, limit, filter, sorted, sortPrice, sortCount) {
    return new Promise((resolve, reject) => {
      let offset = (page - 1) * limit;
      User.findAndCountAll({
        limit: limit,
        offset: offset,
        distinct: true,
        include: [
          {
            model: Good,
            as: "user_good",
            order: [["createdAt", "DESC"]],
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
          console.log("WARN>>>", sorted, sortCount, sortPrice);
          if (sorted === "count") {
            current_data.sort(function (a, b) {
              if (sortCount === "asc") {
                return a.dataValues.good_count - b.dataValues.good_count;
              }

              if (sortCount === "desc") {
                return b.dataValues.good_count - a.dataValues.good_count;
              }
            });
          }
          if (sorted === "price") {
            current_data.sort(function (a, b) {
              if (sortPrice === "asc")
                return a.dataValues.total_price - b.dataValues.total_price;
              if (sortPrice === "desc")
                return b.dataValues.total_price - a.dataValues.total_price;
            });
          }

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
        .then((user) => {
          const good_count = user.user_good.length;
          const total_price = user.user_good.reduce(
            (prev, current) => prev + current.price,
            0
          );
          const fullName = `${user.lastName}.${user.firstName.charAt(0)}${
            user.middleName ? "." : ""
          }${user.middleName.charAt(0)}`;

          const responseData = {
            ...user.dataValues,
            ...{ good_count: good_count },
            ...{ total_price: total_price },
            ...{ fullName: fullName },
          };
          console.log("===responseData", responseData);
          resolve(responseData);
        })
        .catch((err) => reject(err));
    });
  }
  updateAllUserData(data) {
    return new Promise((resolve, reject) => {
      const changeUserData = {
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        position: data.position,
      };

      User.findOrCreate({
        where: {
          id: data.id ? data.id : null,
        },
        defaults: changeUserData,
      })
        .then(([user, created]) => {
          if (!created) {
            User.update(changeUserData, {
              where: {
                id: data.id,
              },
              returning: true,
            }).catch((error) => {
              reject(error);
            });
          } else data.id = user.id;
          data.user_good.forEach((good) => {
            const saveGood = {
              title: good.title,
              price: good.price,
              registrationDate: good.registrationDate,
              owner_id: data.id,
            };
            Good.findOrCreate({
              where: { id: good.id ? good.id : null },
              defaults: saveGood,
            })
              .then(([findGood, created]) => {
                if (!created)
                  Good.update(saveGood, {
                    where: {
                      id: good.id,
                    },
                  });
              })
              .catch((err) => reject(err));
          });
        })
        .then(() => {
          resolve({ code: 0, user_id: data.id });
        })
        .catch((err) => reject(err));
    });
  }

  deleteOneUser(id){
    return new Promise((resolve, reject) => {
      User.destroy({
        where: {
          id: id,
        },
      })
          .then(() => resolve({ code: 0 }))
          .catch((err) => reject(err));
    });
  }
};
