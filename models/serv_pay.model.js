const db = require("../utils/db");
const { Sequelize, DataTypes, Op } = require("sequelize");
var sequelize = db.sequelize;
//-----------------------------
const Menu = sequelize.define("Servpays", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    month: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, //trang thái: 1 đang cập nhật 0 hủy bỏ 2 đã hoàn thành
    },
});
function register(id_user, count, month) {
    return new Promise(async (resolve, reject) => {
        try {
            var newMenu = await Menu.create({
                id_user, count, month
            });
            return resolve(newMenu);
        } catch (error) {
            return reject(error);
        }
    });
}
async function update(id_user, count, month) {
    try {
        var checkUp = Menu.findOne({
            where:{
                id_user:id_user
            }
        })
        if(checkUp){

        }else{

        }
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

module.exports = {
    register,
    update
};
