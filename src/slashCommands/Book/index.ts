import {
  CacheType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import GoodReads from "../../api/GoodReads";
import GoogleApiController from "../../api/GoogleApiController";
import Command from "../../interfaces/Command";

export default class Book implements Command {
  data: SlashCommandBuilder | any;

  constructor() {
    this.data = new SlashCommandBuilder()
      .setName("book")
      .setDescription("Recommend a book")
      .addStringOption((option) =>
        option
          .setName("url")
          .setDescription("The url to the book on Good Reads")
          .setRequired(true)
      );
  }

  async execute(
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    const bookUrl = interaction.options.getString("url")!;
    const bookInformation = await GoodReads.fetchBookData(bookUrl);

    if (bookInformation === undefined) {
      await interaction.reply(
        "Sorry, please provide a good reads url to a book"
      );
      return;
    }

    const api = new GoogleApiController();
    const sheetResponse = await api.addBookToSheet(bookInformation);

    if (sheetResponse !== 1)
      await interaction.reply("Sorry something went wrong, please try again");

    const response = new EmbedBuilder()
      .setTitle(bookInformation.bookTitle)
      .setURL(bookUrl)
      .setDescription(bookInformation.author)
      .addFields(
        { name: "Rating", value: bookInformation.rating, inline: true },
        {
          name: "Genres",
          value: bookInformation.genres.join(", "),
          inline: true,
        },
        {
          name: "Description",
          value: bookInformation.bookDescription,
        }
      )
      .setImage(bookInformation.bookCover);

    await interaction.reply({ embeds: [response] });
  }
}
