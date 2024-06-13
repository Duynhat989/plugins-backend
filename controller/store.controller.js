const tesseract = require("tesseract.js");
const Store = require("../models/store");
const Staff = require("../models/staff");

let debug = true;
exports.register = async (req, res) => {
  try {
    const { name } = req.body;
    const { user_id } = req.user;
    var newStore = await Store.register(name, user_id);
    if (newStore != null) {
      res.send({
        status: true,
        store: newStore,
      });
    } else {
      res.send({
        status: false,
        store: null,
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
        user: null,
      });
    }
  }
};
exports.list = async (req, res) => {
  try {
    const { user_id } = req.user;
    var stores = await Store.list(user_id);
    for(const item of stores){
      item["staffs"] = await Staff.list(item.id)
    }
    res.send({
      status: true,
      stores: stores,
    });
  } catch (error) {
    res.send({
      status: false,
      user: null,
      error: error,
    });
  }
};
