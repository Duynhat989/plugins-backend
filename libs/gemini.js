const { GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold, } = require("@google/generative-ai");
const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
];
const MODEL_NAME = "gemini-1.5-pro-latest";
const createTaskRequest = async (apiKey, prompt, history = [], images = []) => {
    try {
        const generationConfig = {
            temperature: 1,
            topK: 0,
            topP: 0.95,
            maxOutputTokens: 8192,
          };
        const genAI = new GoogleGenerativeAI(apiKey);
        if (images.length > 0) {
            const model = genAI.getGenerativeModel({ model: MODEL_NAME });
            const result = await model.generateContent([prompt, ...images]);
            const response = await result.response;
            const text = response.text();
            return text
        } else {
            const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro-001" });
            const chat = model.startChat({
                history: history,
                generationConfig: generationConfig,
                safetySettings
            });
            const result = await chat.sendMessage(prompt);
            const response = await result.response;
            const text = response.text();
            return text
        }
    } catch (error) {
        console.log(error)
        return null
    }
}
module.exports = {
    createTaskRequest
}