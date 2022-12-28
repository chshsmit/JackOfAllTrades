import {
  SlashCommandBuilder,
  CacheType,
  ChatInputCommandInteraction,
} from "discord.js";
import Command from "../../interfaces/Command";
import { chooseRandom } from "../../util/util";
import { ANSWERS } from "./answers";

export default class EightBall implements Command {
  data: SlashCommandBuilder | any;

  constructor() {
    this.data = new SlashCommandBuilder()
      .setName("8ball")
      .setDescription("Get an answer from the magic 8 ball")
      .addStringOption((option) =>
        option
          .setName("question")
          .setDescription("The question you want answered")
          .setRequired(true)
      );
  }

  async execute(
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    const answer = chooseRandom(ANSWERS);
    await interaction.reply(answer);
  }
}
