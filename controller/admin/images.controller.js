const image_chap = require("../../models/image_chap.model");

let debug = true;
exports.register = async (req, res) => {
    try {
        const { id_chap, index, src, newsrc } = req.body;
        var contains = await image_chap.findContains(id_chap, index)
        if (contains) {
            res.send({
                status: false,
                data: null,
                msg: 'contains'
            });
        }
        else {
            var newStaff = await image_chap.register(id_chap, index, src, newsrc);
            if (newStaff != null) {
                res.send({
                    status: true,
                    staff: newStaff,
                });
            } else {
                res.send({
                    status: false,
                    staff: null,
                });
            }
        }
    } catch (error) {
        if (debug) {
            res.send({
                status: false,
                user: null,
                error: error,
            });
        } else {
            res.send({
                status: false,
                user: null
            });
        }
    }
};
exports.list = async (req, res) => {
    try {
        var Staffs = await image_chap.list();
        res.send({
            status: true,
            staffs: Staffs,
        });
    } catch (error) {
        res.send({
            status: false,
            user: null,
            error: error,
        });
    }
};
exports.detroy = async (req, res) => {
    try {
        const { id } = req.body;
        var Staffs = await image_chap.detroy(id);
        res.send({
            status: true,
            staffs: Staffs,
        });
    } catch (error) {
        res.send({
            status: false,
            user: null,
            error: error,
        });
    }
};