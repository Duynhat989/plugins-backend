const imgbb = require("../../models/imgbb.model");
const img = require('../../utils/request_img')
const imgages = require('../../models/image_chap.model')

const comic = require('../../models/comic.model')

let debug = true;
exports.register = async (req, res) => {
    try {
        const { email, password, apikey } = req.body;
        var newStaff = await imgbb.register(email, password, apikey);
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
exports.findOne = async (req, res) => {
    try {
        var Staffs = await imgbb.findOneAndUpdateStatus();
        if (Staffs) {
            res.send({
                status: true,
                data: Staffs
            });
        } else {
            res.send({
                status: false,
                user: null
            });
        }
    } catch (error) {
        res.send({
            status: false,
            user: null,
            error: error
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
exports.show = async (req, res) => {
    try {
        const { id } = req.query;
        if(id){
            var data =await imgages.find(id)
            if(data){
                var Staffs = await img.showImage(data.src);
                res.set('Content-Type', 'image/jpeg');
                res.send(Staffs);
            }else{
                res.send({
                    status: false,
                    msg: 'notfound',
                });
            }
        }else{
            res.send({
                status: false,
                data: null,
            });
        }
        
    } catch (error) {
        res.send({
            status: false,
            user: null,
            // error: error,
        });
    }
};
exports.showAvata = async (req, res) => {
    try {
        const { id } = req.query;
        if(id){
            var data =await comic.findOne(id)
            if(data){
                var Staffs = await img.showImage(data.avata);
                res.set('Content-Type', 'image/jpeg');
                res.send(Staffs);
            }else{
                res.send({
                    status: false,
                    msg: 'notfound',
                });
            }
        }else{
            res.send({
                status: false,
                data: null,
            });
        }
        
    } catch (error) {
        res.send({
            status: false,
            user: null,
            // error: error,
        });
    }
};