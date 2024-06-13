const db = require("../utils/db");
const { Sequelize, DataTypes, Op } = require("sequelize");
var sequelize = db.sequelize;
//-----------------------------
const Menu = sequelize.define("Chats", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_object: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    messgaes: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, //trang thái: 1 đang cập nhật 0 hủy bỏ 2 đã hoàn thành
    },
});
function register(id_object, id_user, messgaes) {
    return new Promise(async (resolve, reject) => {
        try {
            var newMenu = await Menu.create({
                id_object, id_user, messgaes
            });
            return resolve(newMenu);
        } catch (error) {
            return reject(error);
        }
    });
}
async function update(messgaes, id_object) {
    try {
        const staffs = await Menu.update({
            messgaes
        }, {
            where: { id_object: id_object }
        })
        return staffs;
    } catch (error) {
        return null;
    }
}

async function find(id_object,id_user) {
    try {
        const datas = await Menu.findOne({
            where: { id_object: id_object,
                id_user: id_user
             },
        });
        return datas;
    } catch (error) {
        return null;
    }
}
async function list(id_user) {
    try {
        const datas = await Menu.findAll({
            where: {
                id_user: id_user
             },
             attributes:["id","id_object","messgaes","status","createdAt"],
             order: [['createdAt', 'DESC']],
             limit: 30
        });
        return datas;
    } catch (error) {
        return null;
    }
}
module.exports = {
    register,
    update,
    find,
    list
};
