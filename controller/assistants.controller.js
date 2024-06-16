const chat = require("../models/chat.model");
const gem = require('../libs/gemini.js')
const assistants = require('../libs/assistants.js')


let OPENAI_API_KEY = process.env.OPENAI_API_KEY
exports.createOrUpdateContentAssistant = async (req, res) => {
  const { handle } = req.body;
  assistants.setupAssistant(OPENAI_API_KEY, handle)
  res.status(200).send({
    status: true
  });
};
exports.start = async (req, res) => {
  try {
    const { handle } = req.body;
    const thread = await assistants.start(OPENAI_API_KEY)
    console.log(thread)
    // lưu thông tin ở đây
  
    res.send({
      status: true,
      thread: thread,
    });
  } catch (error) {
    res.status(501).send({
      status: false,
      msg: 'error'
    });
  }
};
exports.chat = async (req, res) => {
  const { handle,threadId,message } = req.body;
    let assistantId = 'asst_wHAZVwBe6YSCXRJFWxGvMB88'
    const chat = await assistants.chat(OPENAI_API_KEY,assistantId,threadId,message)
    // handle  là tên miền của website nào đó
    res.send({
      status: true,
      chat: chat,
    });
  try {
    
  } catch (error) {
    res.status(501).send({
      status: false,
      msg: 'error'
    });
  }
};