const db = require("../config/db_config.js");
const User = db.user;
const Good = db.good;
module.exports = class GoodService {
  /**
   * Добовление мц по айди сотрудника
   * @param {object}data
   */
  addGoodOnUserId(data) {
    return new Promise((resolve, reject) => {
      console.log("=============", data);
      const createData = {
        title: data.title,
        price: data.price,
        registrationDate: data.registrationDate,
        owner_id: data.owner_id,
      };
      Good.create(createData)
        .then(() => resolve({ code: 0 }))
        .catch((error) => reject(error));
    });
  }
  deleteGood(id) {
    return new Promise((resolve, reject) => {
      Good.destroy({
        where: {
          id: id,
        },
      })
        .then(() => resolve({ code: 0 }))
        .catch((err) => reject(err));
    });
  }
  updateGood(data) {
    return new Promise((resolve, reject) => {
      const updateData = {
        title: data.title,
        price: data.price,
        registrationDate: data.registrationDate,
      };
      Good.update(
        { updateData },
        {
          where: {
            id: data.good_id,
          },
        }
      )
        .then(() => resolve({ code: 0 }))
        .catch((err) => reject(err));
    });
  }
};
