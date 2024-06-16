const OpenAI = require("openai");

async function createAssistants() {
    const openai = new OpenAI();
    const myAssistant = await openai.beta.assistants.create({
        instructions:
            "You are a personal math tutor. When asked a question, write and run Python code to answer the question.",
        name: "Math Tutor",
        tools: [{ type: "code_interpreter" }],
        model: "gpt-4-turbo",
    });

    console.log(myAssistant);
}


module.exports = {
    createAssistants
};
