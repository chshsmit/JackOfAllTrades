import { REST, Routes } from "discord.js";
import { COMMANDS } from "./slashCommands";
import { discordToken, guild, application } from "./config";

const commands = COMMANDS.map((command) => {
  return command.data.toJSON();
});

const rest = new REST({ version: "10" }).setToken(discordToken);

// deploy commands
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands`
    );

    const data: any = await rest.put(
      Routes.applicationGuildCommands(application, guild),
      { body: commands }
    );

    console.log(`Successfully reloaded ${data.length} application commands`);
  } catch (error) {
    console.error(error);
  }
})();
