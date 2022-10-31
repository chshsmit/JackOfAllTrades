import {
  CacheType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import GoogleApiController from "../../api/GoogleApiController";
import Command from "../../interfaces/Command";
import getVideoId from "get-video-id";

export default class Bangerz implements Command {
  data: SlashCommandBuilder | any;

  constructor() {
    this.data = new SlashCommandBuilder()
      .setName("banger")
      .setDescription("Add a song to the google sheet")
      .addStringOption((option) =>
        option
          .setName("url")
          .setDescription("The url to the song on youtube")
          .setRequired(true)
      );
  }

  async execute(
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    const youtubeUrl = interaction.options.getString("url")!;
    const { id } = getVideoId(youtubeUrl);

    if (id === null) {
      await interaction.reply("Sorry that is an invalid video.");
    } else {
      const api = new GoogleApiController();
      const videoTitle = await api.getVideoTitle(id);

      if (videoTitle) {
        await api.addSongToSheet(videoTitle, youtubeUrl);

        const response = new EmbedBuilder()
          .setTitle("Added a song!")
          .setDescription(`I added "${videoTitle}" to the sheet`);

        await interaction.reply({ embeds: [response] });
      }
    }
  }
}
