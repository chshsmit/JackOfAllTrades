import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { ADJECTIVES, NOUNS } from "../../data/Words";
import Command from "../../interfaces/Command";
import { capitalizeFirst, chooseRandom } from "../../util/util";

export default class RandomName implements Command {
  data: SlashCommandBuilder | any;

  constructor() {
    this.data = new SlashCommandBuilder()
      .setName("name")
      .setDescription("Randomly reassign your name");
  }

  async execute(
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    const adj = chooseRandom(ADJECTIVES);
    const noun = chooseRandom(NOUNS);
    const name = `${capitalizeFirst(adj)} ${capitalizeFirst(noun)}`;

    // We cant change the server owner's nickname
    if (interaction.guild?.ownerId === interaction.member?.user.id) {
      await interaction.reply({
        content: `Hey, I am sorry but you are the owner of this server and I can't change your name. But here is the name I came up with for you: ${name}`,
        ephemeral: true,
      });
    } else {
      await (interaction.member as any).setNickname(name);
      await interaction.reply({
        content: `I changed your nickname to: ${name}`,
        ephemeral: true,
      });
    }
  }
}
