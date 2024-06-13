const db = require("../utils/db");
const { Sequelize, DataTypes,Op  } = require("sequelize");
var sequelize = db.sequelize;
//-----------------------------
const Genres = sequelize.define("Genress", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    desciption: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, //trang thái: 1 đang cập nhật 0 hủy bỏ 2 đã hoàn thành
    },
});
function register(name, desciption) {
    return new Promise(async (resolve, reject) => {
        try {
            var newMenu = await Genres.create({
                name, desciption
            });
            return resolve(newMenu);
        } catch (error) {
            return reject(error);
        }
    });
}
async function list() {
    try {
        const staffs = await Genres.findAll({
            attributes: ['id', 'name', 'desciption']
        });
        return staffs;
    } catch (error) {
        return null;
    }
}
async function detroy(id) {
    try {
        const staffs = await Genres.destroy({
            where: { id: id },
          });
        return staffs;
    } catch (error) {
        return null;
    }
}
module.exports = {
    register,
    list,
    detroy,
    Genres
};
