const fs = require("fs");
const createAssistant = async (openai,handle) => {
  // Assistant file path
  const assistantFilePath = `./service/assistant_data/${handle}_assistant.json`;
  // check if file exists
  if (!fs.existsSync(assistantFilePath)) {
    // Create a file
    const file = await openai.files.create({
      file: fs.createReadStream("./service/knowledge.txt"),
      purpose: "assistants",
    });
    // Create a vector store including our file
    let vectorStore = await openai.beta.vectorStores.create({
      name: `Assistant_${handle}`,
      file_ids: [file.id],
    });
    // Create assistant
    const assistant = await openai.beta.assistants.create({
      name: `Assistant_${handle}`,
      instructions: `Trợ lý của bạn ,${handle} Assistant. đã được lập trình để giúp cho người vào thăm website có thể biết thêm thông tin về website đó, có thể đưa ra các thông tin về trang web và các gợi ý như một chăm sóc khách hàng thực thụ. Một tài liệu đã được cung cấp với thông tin về trang web cũng như các thông tin khách của trang web. Nếu không đủ thông tin, không hiểu câu hỏi hãy đặt câu hỏi để trả lời nội dung cho hoàn chỉnh. Trả lời ngắn gọn, chỉ cung cấp những nội dung được cung cấp trong tài liệu.`,
      tools: [{ type: "file_search" }],
      tool_resources: { file_search: { vector_store_ids: [vectorStore.id] } },
      model: "gpt-4o-2024-05-13",
    });
    // Write assistant to file
    fs.writeFileSync(assistantFilePath, JSON.stringify(assistant));
    return assistant;
  } else {
    // Read assistant from file
    const assistant = JSON.parse(fs.readFileSync(assistantFilePath));
    return assistant;
  }
};
module.exports = { createAssistant };
