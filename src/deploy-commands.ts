import { REST, Routes } from "discord.js";
import { COMMANDS } from "./slashCommands";
import { getConfiguration } from "./util/util";

const commands = COMMANDS.map((command) => {
  return command.data.toJSON();
});

const config = getConfiguration();

const rest = new REST({ version: "10" }).setToken(config.discordToken);

// deploy commands
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands`
    );

    const data: any = await rest.put(
      Routes.applicationGuildCommands(config.applicationId, config.guildId),
      { body: commands }
    );

    console.log(`Successfully reloaded ${data.length} application commands`);
  } catch (error) {
    console.error(error);
  }
})();
