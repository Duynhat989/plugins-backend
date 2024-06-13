const tesseract = require("tesseract.js");
const User = require("../models/user");
const fs = require("fs");
const Jimp = require("jimp");
const axios = require("axios");

let debug = true;
exports.recognize = async (req, res) => {
  const { image } = req.body;
  const imageBuffer = base64ToArrayBuffer(image);
  // Sử dụng Jimp để xử lý ảnh
  const jimpImage = await Jimp.read(imageBuffer);
  jimpImage.invert().contrast(0.2).greyscale();
  // Lấy lại buffer sau khi xử lý
  const processedBuffer = await jimpImage.getBufferAsync(Jimp.MIME_PNG);
  var textRender = await tesseract.recognize(
    processedBuffer, // Dữ liệu ảnh dưới dạng Base64
    "eng", // Ngôn ngữ (Vietnamese)
    {
      logger: (info) => console.log(info),
    } // Logger để in thông tin
  );
  res.send({
    status: true,
    text: textRender.data.text,
  });
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
exports.analysis = async (req, res) => {
  const { text } = req.body;
  var list = text.split('\n')
  var result = {
    fullname: "",
    content: "",
    money: "",
  }
  result.fullname = await filterFullname(list)
  result.content = await filterContent(list)
  result.money = await filterMoney(list)
  console.log(result)
  res.send({
    status: true,
    input: list,
    output: result,
  });
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
function base64ToArrayBuffer(base64) {
  var binaryString = atob(base64);
  var len = binaryString.length;
  var bytes = new Uint8Array(len);

  for (var i = 0; i < len; ++i) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes.buffer;
}
const filterMoney = async (list) => {
  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    if (element.includes('đ') || element.includes("VNĐ")) {
      return element
    }
  }
  return ""
}
const filterFullname = async (list) => {
  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    if (element.includes('đ') || element.includes("VNĐ")) {
      return element
    }
  }
  return ""
}
const filterContent = async (list) => {
  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    if (element.includes('Nội dung') || element.includes("Tin nhắn")) {
      return element
    }
  }
  return ""
}