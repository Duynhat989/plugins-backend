const db = require("../utils/db");
const { DataTypes } = require("sequelize");
var sequelize = db.sequelize;
//-----------------------------
const Domain = sequelize.define("Domains", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  domain: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "",
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: "",
  },
  status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});
function register(id_user, domain, note) {
  return new Promise(async (resolve, reject) => {
    try {
      const newDomain = await Domain.create({ id_user, domain, note });
      console.log(newDomain);
      return resolve(newDomain);
    } catch (error) {
      return reject(error);
    }
  });
}
function find(id_user, domain) {
  return new Promise(async (resolve, reject) => {
    try {
      const oldDomain = await Domain.findAll({
        where: { 
          id_user: id_user,
          domain: domain
         }, ///-----------------
      });
      return oldDomain;
    } catch (error) {
      return null;
    }
  });
}
async function detroy(id) {
  try {
      const oldDomain = await Domain.destroy({
          where: { id: id },
        });
      return oldDomain;
  } catch (error) {
      return null;
  }
}
module.exports = {
  register,
  find,
  detroy
};
