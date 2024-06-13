const db = require("../utils/db");
const { Sequelize, DataTypes, Op } = require("sequelize");
var sequelize = db.sequelize;
const chapter = require('./chap.model')
const Genres = require('./genres.model')
//-----------------------------
const Comic = sequelize.define("Comics", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true, // Đặt trường slug là duy nhất
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    avata: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    view: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: 0
    },
    src: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: ''
    },
    id_category: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    like: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    dislike: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },

    time_checker: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, //trang thái: 1 đang cập nhật 0 hủy bỏ 2 đã hoàn thành
    },
});
Comic.belongsTo(Genres.Genres, { foreignKey: 'id_category', as: 'category' });
function register(title, slug, description, src, avata, id_category) {
    return new Promise(async (resolve, reject) => {
        try {
            var newMenu = await Comic.create({
                title, slug, description, src, avata, id_category
            });
            return resolve(newMenu);
        } catch (error) {
            return reject(error);
        }
    });
}
async function list(limit = 12,offset, typeName) {
    try {
        let whereCondition = {};
        if (typeName !== undefined) {
            whereCondition = { name: typeName };
        }
        if (offset == undefined) {
            offset = 0
        }
        // Đếm số lượng phần tử
        const totalCount = await Comic.count({
            include: [
                {
                    model: Genres.Genres,
                    as: 'category',
                    attributes: ['id', 'name', 'desciption'],
                    where: whereCondition
                }
            ]
        });

        // Lấy dữ liệu phân trang
        const comics = await Comic.findAll({
            include: [
                {
                    model: Genres.Genres,
                    as: 'category',
                    attributes: ['id', 'name', 'desciption'],
                    where: whereCondition
                }
            ],
            limit: parseInt(limit),
            offset: parseInt(offset * limit)
        });

        return { totalCount, comics };
    } catch (error) {
        return null;
    }
}
async function find(slug) {
    try {
        const datas = await Comic.findOne({
            where: { slug: slug },
            include: [
                {
                    model: Genres.Genres, //
                    as: 'category', // 
                    attributes: ['name', 'desciption'],
                }
            ],
            attributes: ['id', 'title', 'slug', 'description', 'view', 'id_category', 'like', 'dislike', 'time_checker'],

        });
        if (datas) {
            //---------------------------------------
            //view
            datas.view = parseInt(datas.view) + 1;

            // Lưu cập nhật vào cơ sở dữ liệu
            await datas.save();

            // Lấy danh sách chương
            const chapList = await chapter.list(datas.id);

            // Tạo một đối tượng mới chứa dữ liệu từ Menu và danh sách chương
            const newData = {
                ...datas.dataValues, // Sao chép tất cả các thuộc tính của datas
                chap: chapList
            };
            return newData;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}
async function comic_timeout() {
    try {
        // Lấy thời điểm 10 phút trước so với thời điểm hiện tại
        const tenMinutesAgo = new Date(new Date() - 10 * 60 * 1000);

        // Tìm một hàng từ bảng Menu mà time_checker lớn hơn 10 phút trước
        const data = await Comic.findOne({
            where: {
                time_checker: {
                    [Op.gt]: tenMinutesAgo
                }
            },
            order: [['time_checker', 'DESC']] // Sắp xếp theo thời gian giảm dần
        });

        return data;
    } catch (error) {
        return null;
    }
}
async function update_time_Checker(id) {
    try {
        var data = await comics.update({ time_checker: Sequelize.literal('CURRENT_TIMESTAMP') }, {
            where: {
                id
            }
        });
        return data;
    } catch (error) {
        return null;
    }
}
async function search(slug) {
    try {
        const datas = await Comic.findAll({
            where: { slug: { [Op.like]: `%${slug}%` } },
        });
        return datas;
    } catch (error) {
        return null;
    }
}
async function findContains(slug) {
    try {
        const datas = await Comic.findAll({
            where: {
                slug: slug
            },
        });
        if (datas.length > 0) {
            var comic = datas[0]



            return comic
        } else {
            return null
        }

    } catch (error) {
        return null;
    }
}
async function findOne(id) {
    try {
        const datas = await Comic.findOne({
            where: { id: id },
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
    search,
    findContains,
    comic_timeout,
    update_time_Checker,
    findOne
};
