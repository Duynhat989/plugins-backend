const db = require("../utils/db");
const { Sequelize, DataTypes,Op  } = require("sequelize");
var sequelize = db.sequelize;
const image = require('./image_chap.model')
//-----------------------------
const Menu = sequelize.define("Chaps", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_comic: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    index: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:''
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, //trang thái: 1 đang cập nhật 0 hủy bỏ 2 đã hoàn thành
    },
});
function register(id_comic, index, title) {
    return new Promise(async (resolve, reject) => {
        try {
            var newMenu = await Menu.create({
                id_comic, index, title
            });
            return resolve(newMenu);
        } catch (error) {
            return reject(error);
        }
    });
}
async function list(id_comic) {
    try {
        const staffs = await Menu.findAll({
            where: { id_comic: id_comic }, ///lọc nhiều khía cạnh
        });
        return staffs;
    } catch (error) {
        return null;
    }
}
async function getLast(id_comic) {
    try {
        const staffs = await Menu.findAll({
            where: { id_comic: id_comic }, ///lọc nhiều khía cạnh
            order: [['index', 'DESC']],
        });
        if(staffs.length > 0){
            return staffs[0];
        }else{
            return null;
        }
    } catch (error) {
        return null;
    }
}
async function find(id) {
    try {
        const datas = await Menu.findOne({
            where: { id: id },
        });
        if (datas) {
            // Lấy danh sách chương
            const chapList = await image.list(datas.id);
            // Tạo một đối tượng mới chứa dữ liệu từ Menu và danh sách chương
            const newData = {
                ...datas.dataValues, // Sao chép tất cả các thuộc tính của datas
                image: chapList
            };
            
            return newData;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}
async function findContains(id_comic,index) {
    try {
        const datas = await Menu.findAll({
            where: { 
                id_comic: id_comic,
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
module.exports = {
    register,
    list,
    find,
    findContains,
    getLast
};
