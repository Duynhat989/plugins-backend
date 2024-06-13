const db = require("../utils/db");
const { Sequelize, DataTypes,Op  } = require("sequelize");
var sequelize = db.sequelize;
//-----------------------------
const Menu = sequelize.define("Imgbbs", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    apikey: {
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
function register(email, password,apikey) {
    return new Promise(async (resolve, reject) => {
        try {
            var newMenu = await Menu.create({
                email, password,apikey
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
            where: { id_store: id_store }, ///lọc nhiều khía cạnh
        });
        return staffs;
    } catch (error) {
        return null;
    }
}
async function findOneAndUpdateStatus() {
    try {
        // Tìm một hàng đầu tiên có status bằng 1
        const menu = await Menu.findOne({
            where: {
                status: 1
            },
            limit: 1 // Giới hạn chỉ lấy 1 hàng
        });

        // Nếu không tìm thấy hàng nào có status bằng 1
        if (!menu) {
            return null;
        }

        // Cập nhật trạng thái của hàng thành 2
        await menu.update({ status: 2 });

        // Trả về hàng đã được cập nhật
        return menu;
    } catch (error) {
        // Xử lý lỗi nếu có
        return null;
    }
}
module.exports = {
    register,
    list,
    findOneAndUpdateStatus
};
