const tokens = require("../models/tokens.model.js");
const create = require('../libs/fptai.js')
const gpt = require('../libs/gpt.js')

exports.audio = async (req, res) => {
  const { text, type, voice } = req.body;
  if (type == 0) {
    var tokenAvalibel = await tokens.findAndDelete();
    if (tokenAvalibel) {
      create.createAudio(text, tokenAvalibel.content, voice)
        .then((result) => {
          if (result.error) {
            res.send({
              status: false,
              ...result
            });
          } else {
            res.send({
              status: true,
              ...result
            });
          }
        }).catch((error) => {
          res.send({
            status: true,
            ...error
          });
        })
    } else {
      res.status(200).send({
        status: false,
        msg: 'token auth'
      });
    }

  } else {
    res.status(200).send({
      status: false,
      msg: 'token auth dd'
    });
  }

};
exports.conversation = async (req, res) => {
  const { messgaes } = req.body;
  var lst = await tokens.register(messgaes)
  tokens.findAllAndDelete()
  res.send({
    status: true,
    data: lst,
  });

};
exports.find = async (req, res) => {
  try {
    var Staffs = await tokens.findAndDelete();
    if (Staffs) {
      res.status(200).send({
        status: true,
        data: Staffs,
      });
    } else {
      res.status(200).send({
        status: false,
        msg: 'error'
      });
    }
  } catch (error) {
    res.status(200).send({
      status: false,
      msg: 'error'
    });
  }
};
exports.speech = async (req, res) => {
  var xpath = await gpt.createAudio()
    res.status(200).send({
      status: true,
      msg: xpath
    });
  try {
    
  } catch (error) {
    res.status(200).send({
      status: false,
      msg: 'error'
    });
  }
};

//server api thứ 3



