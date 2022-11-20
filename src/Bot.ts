import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import { COMMANDS } from "./slashCommands";
import { discordToken } from "./config";

console.log("Bot is starting");


const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();

COMMANDS.forEach((command) => {
  client.commands.set(command.data.name, command);
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    console.error(`No command matching ${interaction.commandName}`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(discordToken);
