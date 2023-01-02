import { EmbedBuilder } from "@discordjs/builders";
import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import Command from "../../interfaces/Command";
import { randomNumber } from "../../util/util";

export default class Lottery implements Command {
  data: SlashCommandBuilder | any;

  constructor() {
    this.data = new SlashCommandBuilder()
      .setName("lottery")
      .setDescription("Generate lotter numbers")
      .addNumberOption((option) =>
        option
          .setName("amount")
          .setDescription(
            "The total number of lottery numbers you want to generate"
          )
          .setRequired(false)
          .setMinValue(1)
      )
      .addNumberOption((option) =>
        option
          .setName("max")
          .setDescription(
            "The max number in the range to pick from. Defaults to 100"
          )
          .setRequired(false)
      )
      .addNumberOption((option) =>
        option
          .setName("min")
          .setDescription(
            "The min number in the range to pick from. Defaults to 1"
          )
          .setRequired(false)
      );
  }

  async execute(
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    let totalNumbers = interaction.options.getNumber("amount");
    totalNumbers = totalNumbers === null ? 5 : totalNumbers;

    let minNumber = interaction.options.getNumber("min");
    minNumber = minNumber === null ? 1 : minNumber;

    let maxNumber = interaction.options.getNumber("max");
    maxNumber = maxNumber === null ? 100 : maxNumber;

    if (minNumber > maxNumber) {
      await interaction.reply({
        content: "You provided a min greater than the max",
        ephemeral: true,
      });
      return;
    }

    if (maxNumber - minNumber + 1 < totalNumbers) {
      await interaction.reply({
        content:
          "You provided too small a range for the total amount of numbers you wanted generated",
        ephemeral: true,
      });
      return;
    }

    // const numbers = Array.from({ length: totalNumbers }, () =>
    //   Math.floor(Math.random() * 69 + 1)
    // );

    const numbers = new Set();
    while (numbers.size !== totalNumbers) {
      numbers.add(randomNumber(minNumber, maxNumber));
    }

    const response = new EmbedBuilder()
      .setTitle("Lottery Numbers")
      .setDescription(`Here are your ${totalNumbers} lottery numbers`)
      .addFields({
        name: "Numbers",
        value: Array.from(numbers).join(", "),
      });

    await interaction.reply({ embeds: [response] });
  }
}
