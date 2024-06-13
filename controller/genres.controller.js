const genres = require("../models/genres.model");

let debug = true;
exports.register = async (req, res) => {
  try {
    const { name,desciption } = req.body;
    var newStaff = await genres.register(name,desciption);
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
exports.list = async (req, res) => {
  try {
    var Staffs = await genres.list();
    res.send({
      status: true,
      data: Staffs,
    });
  } catch (error) {
    res.send({
      status: false,
      error: error,
    });
  }
};
exports.detroy = async (req, res) => {
  try {
    const { id } = req.body;
    var Staffs = await genres.detroy(id);
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