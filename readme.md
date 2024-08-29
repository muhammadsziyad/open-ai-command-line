To create a Node.js script using the latest OpenAI SDK with the type: module configuration, you will need to adjust your code slightly to use ES6 module syntax. Here’s how you can set it up:

Step-by-Step Guide
1. Set Up Your Node.js Environment
Ensure you have Node.js installed on your system. You can download it from the official Node.js website.

2. Initialize a New Node.js Project
Create a new directory for your project and initialize a new Node.js project.

```command
mkdir openai-nodejs-cli
cd openai-nodejs-cli
npm init -y
```

3. Update package.json for ES6 Modules
Open your package.json file and add "type": "module" to use ES6 module syntax.

```json
{
  "name": "openai-nodejs-cli",
  "version": "1.0.0",
  "main": "openai-cli.js",
  "type": "module",  // Add this line
  "dependencies": {
    "dotenv": "^16.3.1",
    "openai": "^4.5.0",
    "readline-sync": "^1.4.10"
  }
}
```

4. Install Required Packages
Install the openai, readline-sync, and dotenv packages using npm:

```npm
npm install openai readline-sync dotenv
```

5. Set Up Your OpenAI API Key
Create a .env file in your project directory to securely store your API key:

```env
touch .env
```
Add your API key to the .env file:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

Replace your_openai_api_key_here with your actual OpenAI API key.

6. Create the Node.js Script
Create a new file named openai-cli.js in your project directory:

```command
touch openai-cli.js
```

Edit openai-cli.js with the following code using ES6 module syntax:

```node
import 'dotenv/config';  // Automatically loads environment variables from .env
import { OpenAIApi, Configuration } from 'openai';
import readlineSync from 'readline-sync';

// Initialize OpenAI configuration
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function getResponse(prompt) {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
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
```

7. Run the Program
Save your changes and run the script using Node.js:

```command
node openai-cli.js
```

You should see the following prompt in your terminal:

![[Screen Shot 2024-08-29 at 9.56.40 AM.png]]