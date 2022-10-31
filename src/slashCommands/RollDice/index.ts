import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import Command from "../../interfaces/Command";

export default class RollDice implements Command {
  data: SlashCommandBuilder | any;

  constructor() {
    this.data = new SlashCommandBuilder()
      .setName("roll")
      .setDescription("Roll a dice with a max number")
      .addNumberOption((option) =>
        option
          .setName("max")
          .setDescription("The max number")
          .setRequired(false)
          .setMinValue(2)
      );
  }

  async execute(
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    let maxNum = interaction.options.getNumber("max");
    maxNum = maxNum === null ? 6 : maxNum;

    const num = Math.floor(Math.random() * (maxNum - 1 + 1) + 1);

    await interaction.reply({ content: `Your dice roll is ${num}` });
  }
}
