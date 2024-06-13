const db = require("../utils/db");
const { Sequelize, DataTypes, Op } = require("sequelize");
var sequelize = db.sequelize;
//-----------------------------
const Menu = sequelize.define("Prompts", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    detail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    placeholder: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    form_submit: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, //trang thái: 1 đang cập nhật 0 hủy bỏ 2 đã hoàn thành
    },
});
function register(title, detail, image,placeholder, form_submit) {
    return new Promise(async (resolve, reject) => {
        try {
            var newMenu = await Menu.create({
                title, detail, image,placeholder, form_submit
            });
            return resolve(newMenu);
        } catch (error) {
            return reject(error);
        }
    });
}
async function update(title, detail, image,placeholder, form_submit, id) {
    try {
        const staffs = await Menu.update({
            title, detail, image,placeholder, form_submit
        }, {
            where: { id: id }
        })
        return staffs;
    } catch (error) {
        return null;
    }
}

async function list() {
    try {
        const datas = await Menu.findAll({
            attributes: ["id", "title", "detail","placeholder", "image"]
        });
        return datas;
    } catch (error) {
        return null;
    }
}
async function find(id_prompt) {
    try {
        const datas = await Menu.findOne({
            where: { id: id_prompt },
            attributes: ["title", "detail","placeholder", "image"]
        });
        return datas;
    } catch (error) {
        return null;
    }
}
module.exports = {
    register,
    update,
    list,
    find
};
