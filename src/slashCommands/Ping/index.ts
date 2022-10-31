import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import Command from "../../interfaces/Command";

export default class Ping implements Command {
  data: SlashCommandBuilder;
  test: string;

  constructor() {
    this.data = new SlashCommandBuilder()
      .setName("ping")
      .setDescription("Reply with pong");
    this.test = "hello";
  }

  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply("hello");
  }
}
