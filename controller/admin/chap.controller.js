const chaps = require("../../models/chap.model");
const image_chap = require("../../models/image_chap.model");

let debug = true;
exports.register = async (req, res) => {
  try {
    const { id_comic, index, title } = req.body;
    var contains = await chaps.findContains(id_comic, index)
    if (contains) {
      res.send({
        status: false,
        data: null,
        msg: 'contains'
      });
      
    } else {
      var newStaff = await chaps.register(id_comic, index, title);
      if (newStaff != null) {
        res.send({
          status: true,
          data: newStaff,
        });
      } else {
        res.send({
          status: false,
          data: null,
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
    var Staffs = await chaps.list();
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
    var Staffs = await chaps.detroy(id);
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
exports.findOne = async (req, res) => {
  try {
    const { id } = req.body
    var Staffs = await chaps.find(id)
    res.send({
      status: true,
      data: Staffs,
    });
  } catch (error) {
    res.send({
      status: false,
      user: null,
      error: error,
    });
  }
};