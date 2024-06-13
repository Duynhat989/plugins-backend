const db = require("../utils/db");
const { DataTypes } = require("sequelize");
var sequelize = db.sequelize;
//-----------------------------
const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  referral_code: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ip_address: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  favourites: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  role: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  verify: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});
(async () => {
  await sequelize.sync();
})();
async function login(email, password) {
  const user = await User.findOne({
    where: { email: email},
  });
  if (user) {
    return user.toJSON()
  } else {
    return null
  }
}
function info_person(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        where: { id: id },
      });
      if (user) {
        resolve(user.toJSON());
      } else {
        reject(null);
      }
    } catch (error) {
      reject(error);
    }
  });
}
async function check_contains_email(email) {
  const user = await User.findOne({
    where: { email: email },
  });
  if (user) {
    return user.toJSON();
  } else {
    return null;
  }
}
async function get_user_with_email(email) {
  const user = await User.findOne({
    where: { email: email },
  });
  if (user) {
    return user;
  } else {
    return null;
  }
}
async function get_user_with_id(id,code) {
  const user = await User.findOne({
    where: { id: id,verify: code },
  });
  if (user) {
    return user;
  } else {
    return null;
  }
}
async function get_user_with_id_one(id) {
  const user = await User.findOne({
    where: { id: id},
  });
  if (user) {
    return user;
  } else {
    return null;
  }
}
function register(referral_code, email, password, ip_address) {
  return new Promise(async (resolve, reject) => {
    try {
      const newUser = await User.create({
        referral_code: referral_code,
        password: password,
        email: email,
        ip_address: ip_address,
      });
      console.log(newUser);
      return resolve(newUser);
    } catch (error) {
      return reject(error);
    }
  });
}
function change_password_old(id, hash) {
  return new Promise((resolve, reject) => {
    db.dbConn.query(
      "UPDATE users SET password=? WHERE id=?",
      [hash, id],
      (error, results, fields) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      }
    );
  });
}

module.exports = {
  login,
  register,
  change_password_old,
  check_contains_email,
  info_person,
  get_user_with_email,
  get_user_with_id,
  get_user_with_id_one
};
