const db = require("../utils/db");
const { Sequelize, DataTypes,Op  } = require("sequelize");
var sequelize = db.sequelize;
//-----------------------------
const Menu = sequelize.define("Images", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_chap: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    index: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    src: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue:''
    },
    newsrc: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue:''
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, //trang thái: 1 đang cập nhật 0 hủy bỏ 2 đã hoàn thành
    },
});
function register(id_chap, index, src, newsrc) {
    return new Promise(async (resolve, reject) => {
        try {
            var newMenu = await Menu.create({
                id_chap, index, src, newsrc
            });
            return resolve(newMenu);
        } catch (error) {
            return reject(error);
        }
    });
}
async function list(id_chap) {
    try {
        const staffs = await Menu.findAll({
            where: { id_chap: id_chap }, ///lọc nhiều khía cạnh
            attributes: ['id', 'index','status','id_chap']
        });
        return staffs;
    } catch (error) {
        return null;
    }
}
async function find(id) {
    try {
        const datas = await Menu.findOne({
            where: { id: id },
        });
        return datas;
    } catch (error) {
        return null;
    }
}
async function findContains(id_chap,index) {
    try {
        const datas = await Menu.findAll({
            where: { 
                id_chap: id_chap,
                index:index
            },
        });
        if(datas.length > 0){
            return true
        }else{
            return false
        }
       
    } catch (error) {
        return null;
    }
}
async function search(slug) {
    try {
        const datas = await Menu.findAll({
            where: { slug: { [Op.like]: `%${slug}%` } },
        });
        return datas;
    } catch (error) {
        return null;
    }
}
module.exports = {
    register,
    list,
    find,
    findContains
};
