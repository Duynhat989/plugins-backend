const db = require("../utils/db");
const { Sequelize, DataTypes, Op } = require("sequelize");
var sequelize = db.sequelize;
//-----------------------------
const Menu = sequelize.define("Sevices", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_package: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, //trang thái: 1 đang cập nhật 0 hủy bỏ 2 đã hoàn thành
    },
});
function register(id_user, id_package, date) {
    return new Promise(async (resolve, reject) => {
        try {
            var newMenu = await Menu.create({
                id_user, id_package, date
            });
            return resolve(newMenu);
        } catch (error) {
            return reject(error);
        }
    });
}
async function find(id_user) {
    try {
        const datas = await Menu.findOne({
            where: { id_user: id_user },
        });
        if (datas) {

            return datas;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}
async function updateDate(id_user, newdate) {
    try {
        const [affectedRows] = await Menu.update(
            { date: newdate },
            { where: { id_user: id_user } }
        );

        if (affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error updating date:", error);
        return false;
    }
}
async function updateDateOnMonth(id_user, numberOfMonths) {
    try {
        // Tính toán ngày mới từ số tháng được cung cấp
        const currentDate = new Date();
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + numberOfMonths, currentDate.getDate());

        // Cập nhật dữ liệu trong cơ sở dữ liệu
        const [affectedRows] = await Menu.update(
            { date: newDate },
            { where: { id_user: id_user } }
        );

        if (affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error updating date:", error);
        return false;
    }
}
async function updateDateMonth(id_user, numberOfMonths) {
    try {
        // Kiểm tra xem có dữ liệu nào với id_user đã cho hay không
        const existingData = await Menu.findOne({
            where: { id_user: id_user },
        });

        if (existingData) {
            // Nếu đã có dữ liệu, cộng thêm số tháng vào cột date
            const currentDate = existingData.date || new Date(); // Lấy ngày hiện tại hoặc ngày trong cơ sở dữ liệu nếu có
            const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + numberOfMonths, currentDate.getDate());

            // Cập nhật dữ liệu trong cơ sở dữ liệu
            const [affectedRows] = await Menu.update(
                { date: newDate },
                { where: { id_user: id_user } }
            );

            if (affectedRows > 0) {
                return true;
            } else {
                return false;
            }
        } else {
            // Nếu chưa có dữ liệu, tạo dữ liệu mới với thời gian hiện tại cộng với số tháng
            const currentDate = new Date();
            const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + numberOfMonths, currentDate.getDate());

            const newMenu = await Menu.create({
                id_user: id_user,
                date: newDate,
                status: 1 // Trạng thái mới: đang cập nhật
            });

            if (newMenu) {
                return true;
            } else {
                return false;
            }
        }
    } catch (error) {
        console.error("Error updating date:", error);
        return false;
    }
}

module.exports = {
    register,
    updateDate,
    find,
    updateDateOnMonth,
    updateDateMonth
};
