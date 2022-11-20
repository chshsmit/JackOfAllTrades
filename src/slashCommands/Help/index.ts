import Command from "../../interfaces/Command";
import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { EmbedBuilder } from "@discordjs/builders";
import { COMMANDS } from "..";

export default class Help implements Command {
  data: SlashCommandBuilder | any;

  constructor() {
    this.data = new SlashCommandBuilder()
      .setName("help")
      .setDescription("Help with all commands");
  }

  async execute(
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    const embed = new EmbedBuilder().setTitle("All available commands");

    const fields = COMMANDS.map((command) => {
      return {
        name: command.data.name,
        value: command.data.description,
      };
    });

    embed.addFields(fields);
    await interaction.reply({ embeds: [embed] });
  }
}
