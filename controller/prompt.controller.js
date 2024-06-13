const promp = require("../models/prompt.model");

let debug = true;
exports.list = async (req, res) => {
  try {
    var props = await promp.list()
    res.send({
      status: true,
      data: props,
    });
  } catch (error) {
    res.send({
      status: false,
      error: error,
    });
  }
};
exports.find = async (req, res) => {
  try {
    const { id_prompt } = req.body
    var props = await promp.find(id_prompt)
    res.send({
      status: true,
      data: props,
    });
  } catch (error) {
    res.send({
      status: false,
      error: error,
    });
  }
};
