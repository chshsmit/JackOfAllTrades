import { REST, Routes } from "discord.js";
import { COMMANDS } from "./slashCommands";

const token = "";
const guildId = "811428416380469249";
const applicationId = "1035631158437888110";

const commands = COMMANDS.map((command) => {
  return command.data.toJSON();
});

const rest = new REST({ version: "10" }).setToken(token);

// deploy commands
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands`
    );

    const data: any = await rest.put(
      Routes.applicationGuildCommands(applicationId, guildId),
      { body: commands }
    );

    console.log(`Successfully reloaded ${data.length} application commands`);
  } catch (error) {
    console.error(error);
  }
})();
