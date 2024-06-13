const tesseract = require("tesseract.js");
const Staff = require("../models/staff");

let debug = true;
exports.register = async (req, res) => {
  try {
    const { id_store,id_user } = req.body;
    var newStaff = await Staff.register(id_store, id_user);
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
    const { user_id } = req.user;
    var Staffs = await Staff.list(user_id);
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
