const tesseract = require("tesseract.js");
const Menu = require("../models/menu");
const Store = require("../models/store");

let debug = true;
exports.register = async (req, res) => {
  const { id_store } = req.body;
  const { user_id } = req.user;

  var store = await Store.findOne(id_store);
  if (store != null) {
    var newMenu = await Menu.register(id_store);
    console.log("--><",newMenu)
    if (newMenu != null) {
      console.log(newMenu)
      res.send({
        status: true,
        menu: newMenu,
      });
    } else {
      res.send({
        status: false,
        msg: "not defind",
        menu: null,
      });
    }
  } else {
    res.send({
      status: false,
      msg: "not defind store",
      menu: null,
    });
  }
  try {
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
    var newMenu = await Menu.list(user_id);
    res.send({
      status: true,
      staffs: newMenu,
    });
  } catch (error) {
    res.send({
      status: false,
      user: null,
      error: error,
    });
  }
};
