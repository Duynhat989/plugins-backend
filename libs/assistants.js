const OpenAI = require("openai");
const { createAssistant } = require("../service/openai.service");


const start = async (apiKey) => {
    const openai = new OpenAI({ apiKey: apiKey });
    const thread = await openai.beta.threads.create();
    return thread;
};
const setupAssistant = async (apiKey,handle) => {
    const openai = new OpenAI({ apiKey: apiKey });
    const assistant = await createAssistant(openai,handle);
    console.log(assistant)
};
const chat = async (apiKey,assistantId,threadId,message) => {
    const openai = new OpenAI({ apiKey: apiKey });
    if (!threadId) {
        return res.status(400).json({ error: "Missing thread_id" });
      }
      console.log(`Received message: ${message} for thread ID: ${threadId}`);
      await openai.beta.threads.messages.create(threadId, {
        role: "user",
        content: message,
      });
      const run = await openai.beta.threads.runs.createAndPoll(threadId, {
        assistant_id: assistantId,
      });
      const messages = await openai.beta.threads.messages.list(run.thread_id);
      const response = messages.data[0].content[0].text.value;
      return response;
};
module.exports = {
    start,
    setupAssistant,
    chat
};
