const { Configuration, OpenAIApi } = require("openai");
const { Client, GatewayIntentBits } = require('discord.js');



// Set up the Discord client
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
	],
});
client.login('your Discord bot token here');

// Define a function to generate a response using GPT-3

const configuration = new Configuration({
  apiKey: 'your OpenAI API token here',
});

const openai = new OpenAIApi(configuration);



// Listen for messages
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });
  
client.on('messageCreate', async (message) => {
    if (message.mentions.users.has(client.user.id)) {

    console.log("message received, " + message.content);
  
    // Generate a response using GPT-3
    const prompt = message.content;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 1500,
        temperature: 0.7,
      });
  
    // Send the response back to the Discord channel
    message.channel.send(response.data.choices[0].text);
}});
  
  
  
  
  
  