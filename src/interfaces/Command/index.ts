import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default abstract class Command {
  abstract data: SlashCommandBuilder | any;
  abstract execute(interaction: ChatInputCommandInteraction): Promise<void>;
}
