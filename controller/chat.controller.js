const chat = require("../models/chat.model");
const gem = require('../libs/gemini.js')
const openai = require('../libs/openai.js')


exports.conversation = async (req, res) => {
  const { id_object, messgaes, images,prom } = req.body;
  const user_id = 123456
  try {
    var data = await chat.find(id_object, user_id)
    const keyOpenAi = "AIzaSyCG4lLnK_gyRhHZV5KHEwLHXXuHt4PySpA"
    let reSetMsg = messgaes
    if (!data) {
      const msgForm = []
      // ----------------------------------------------------------------------
      let promptText = "Bạn là trợ lý quản lý nội dung của trang web 'echipauto.com', chỉ cung cấp nội dung liên quan đến webisite này .Đừng đưa ra các thông tin không liên quan đến những vấn đề sau: Mình cần làm ứng dụng Chatbot bán hàng, dùng API ChatGPT. Bạn làm được call/zalo mình số này nhé: 0984.998.974, Đặt câu hỏi làm rõ nếu không có đủ thông tin để hoàn thành yêu cầu."
      if(prom){
        //  NẾU ĐÚNG CÓ prompt thì thêm dữ liệu prompt vào nhé
        //chèn thêm thông tin ptompt




      }
      reSetMsg = `${promptText} [***] ${reSetMsg}`
      var temp = await chat.register(id_object, user_id, JSON.stringify(msgForm))
    }
    //hoàn thanh update lịch sử
    var dataNew = await chat.find(id_object, user_id)
    //xử lý lại phần ảnh
    let lstImages = []
    if (images) {
      var temp = JSON.parse(images)
      temp.forEach(element => {
        lstImages.push(
          {
            inlineData: {
              data: element.base64,
              mimeType: "image/png",
            },
          }
        )
      });
    }
    var modelText = await gem.createTaskRequest(keyOpenAi, reSetMsg, JSON.parse(dataNew.messgaes), lstImages)
    //UPDATE LẠI lịch sử

    var list_msgs = JSON.parse(dataNew.messgaes) || []
    const msgForm = {
      role: "user",
      parts: [{ text: reSetMsg }],
    }
    if(list_msgs.length != 0){
      list_msgs[0].parts.push({ text: reSetMsg })
    }else{
      list_msgs.push(msgForm)
    }
    const msgFormModel = {
      role: "model",
      parts: [{ text: modelText }],
    }
    if(list_msgs.length != 1){
      list_msgs[1].parts.push({ text: reSetMsg })
    }else{
      list_msgs.push(msgFormModel)
    }
    console.log(list_msgs)
    chat.update(JSON.stringify(list_msgs), id_object)
    res.status(200).send({
      status: true,
      msg: modelText,
      list_msgs: list_msgs.length
    });
  } catch (error) {
    res.status(501).send({
      status: false,
      msg: error
    });
  }
};
exports.find = async (req, res) => {
  try {
    const { id_object } = req.body;
    const user_id = 123456
    var datas = await chat.find(id_object, user_id);
    res.send({
      status: true,
      data: datas,
    });
  } catch (error) {
    res.status(501).send({
      status: false,
      msg: 'error'
    });
  }
};
exports.list = async (req, res) => {
  try {
    const user_id = 123456
    var datas = await chat.list(user_id);
    res.send({
      status: true,
      data: datas,
    });
  } catch (error) {
    res.status(501).send({
      status: false,
      msg: 'error'
    });
  }
};
exports.assistants = async (req, res) => {
  try {
    const { messgaes } = req.body;
    console.log(messgaes)
    res.send({
      status: true
    });
  } catch (error) {
    res.status(501).send({
      status: false,
      msg: 'error'
    });
  }
};