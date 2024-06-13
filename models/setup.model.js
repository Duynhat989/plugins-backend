const db = require("../utils/db");
const { Sequelize, DataTypes } = require("sequelize");
var sequelize = db.sequelize;
//-----------------------------
const Menu = sequelize.define("Setups", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});
function register(id_store) {
  return new Promise(async (resolve, reject) => {
    try {
      var newMenu = await Menu.create({
        id_store: id_store,
      });
      return resolve(newMenu);
    } catch (error) {
      return reject(error);
    }
  });
}
async function list(id_store) {
  try {
    const staffs = await Menu.findAll({
      where: { id_store: id_store },
    });
    return staffs;
  } catch (error) {
    return null;
  }
}
async function find(name) {
    try {
      const datas = await Menu.findOne({
        where: { name: name },
      });
      return datas;
    } catch (error) {
      return null;
    }
  }
module.exports = {
  register,
  list,
  find
};
