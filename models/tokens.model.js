const db = require("../utils/db");
const { Sequelize, DataTypes, Op } = require("sequelize");
var sequelize = db.sequelize;
//-----------------------------
const Menu = sequelize.define("Tokens", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, //trang thái: 1 đang cập nhật 0 hủy bỏ 2 đã hoàn thành
    },
});
function register(content) {
    return new Promise(async (resolve, reject) => {
        try {
            var newMenu = await Menu.create({
                content
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

async function find() {
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
async function findAndDelete() {
    try {
        const datas = await Menu.findOne();
        if (datas) {
            await datas.destroy(); // Xóa dữ liệu đã tìm thấy
            console.log('Dữ liệu đã được xóa thành công.');
        } else {
            console.log('Không tìm thấy dữ liệu cần xóa.');
        }
        return datas;
    } catch (error) {
        console.error('Lỗi khi tìm và xóa dữ liệu:', error);
        return null;
    }
}
async function findAllAndDelete() {
    try {
        const fiveMinutesAgo = new Date(Date.now() - (1 * 60 * 1000 + 30 * 1000)); // Tính thời gian cách đây 5 phút
        const datas = await Menu.findAll({
            where: {
                createdAt: {
                    [Op.lt]: fiveMinutesAgo // Tìm các hàng có createdAt nhỏ hơn thời điểm cách đây 5 phút
                }
            }
        });
        
        if (datas.length > 0) {
            await Menu.destroy({
                where: {
                    createdAt: {
                        [Op.lt]: fiveMinutesAgo
                    }
                }
            });
            console.log('Dữ liệu đã được xóa thành công.');
        } else {
            console.log('Không tìm thấy dữ liệu cần xóa.');
        }
        return datas; // Trả về dữ liệu đã tìm thấy (có thể là null nếu không tìm thấy)
    } catch (error) {
        console.error('Lỗi khi tìm và xóa dữ liệu:', error);
        return null;
    }
}
module.exports = {
    register,
    update,
    find,
    findAndDelete,
    findAllAndDelete
};
