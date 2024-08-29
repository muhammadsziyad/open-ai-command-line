import 'dotenv/config';  // Automatically loads environment variables from .env
import { OpenAI } from 'openai';
import readlineSync from 'readline-sync';

// Initialize OpenAI configuration


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function getResponse(prompt) {
    try {
        const response1 = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
        });

        const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
            role: "user",
            content: prompt,
        },
    ],
});

        return response.choices[0].message.content;
    } catch (error) {
        console.error("Error fetching response from OpenAI:", error.message);
    }
}

(async () => {
    while (true) {
        const prompt = readlineSync.question('Enter your prompt: ');
        if (prompt.toLowerCase() === 'exit') break;

        const response = await getResponse(prompt);
        console.log("\nOpenAI Response:", response, "\n");
    }
})();
