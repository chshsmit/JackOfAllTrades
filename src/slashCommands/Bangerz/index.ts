import axios from "axios";
import {
  CacheType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import getVideoId from "get-video-id";
import GoogleApiController from "../../api/GoogleApiController";
import Command from "../../interfaces/Command";
import { getConfiguration } from "../../util/util";

export default class Bangerz implements Command {
  data: SlashCommandBuilder | any;

  constructor() {
    this.data = new SlashCommandBuilder()
      .setName("banger")
      .setDescription("Add a song to the google sheet or spotify playlist")
      .addStringOption((option) =>
        option
          .setName("url")
          .setDescription("The url to the song on youtube or spotify")
          .setRequired(true)
      );
  }

  async execute(
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    await interaction.reply("Woking on it...");

    const songUrl = interaction.options.getString("url")!;
    if (songUrl.includes("spotify")) {
      this.handleSpotifyUrl(songUrl, interaction);
    } else {
      this.handleYoutubeUrl(songUrl, interaction);
    }
  }

  private async handleSpotifyUrl(
    url: string,
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    const config = getConfiguration();

    const idSubstring = url.split("track/")[1];
    const songId = idSubstring.split("?")[0];

    const spotifyAuth = await axios({
      method: "POST",
      url: `https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=${config.spotifyRefreshToken}`,
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            config.spotifyClientId + ":" + config.spotifyApiSecret
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const addSongToPlaylist = await axios.post(
      `https://api.spotify.com/v1/playlists/${config.spotifyPlaylistId}/tracks`,
      {
        uris: [`spotify:track:${songId}`],
      },
      {
        headers: {
          Authorization: `Bearer ${spotifyAuth.data.access_token}`,
        },
      }
    );

    if (addSongToPlaylist.data.snapshot_id) {
      const songData = await axios.get(
        `https://api.spotify.com/v1/tracks/${songId}`,
        {
          headers: {
            Authorization: `Bearer ${spotifyAuth.data.access_token}`,
          },
        }
      );

      const artists = songData.data.artists.map((artist: any) => {
        return artist.name;
      });

      const response = new EmbedBuilder()
        .setTitle("Added a song!")
        .setDescription(
          `I added ${songData.data.name} by ${artists.join(
            ", "
          )} to the playlist!`
        );

      await interaction.followUp({ embeds: [response] });
    } else {
      await interaction.followUp("Something went wrong");
    }
  }

  private async handleYoutubeUrl(
    url: string,
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    const { id } = getVideoId(url);
    if (id === null) {
      await interaction.followUp("Sorry that is an invalid video.");
    } else {
      const api = new GoogleApiController();
      const videoTitle = await api.getVideoTitle(id);

      if (videoTitle) {
        await api.addSongToSheet(videoTitle, url);

        const response = new EmbedBuilder()
          .setTitle("Added a song!")
          .setDescription(`I added "${videoTitle}" to the sheet`);

        await interaction.followUp({ embeds: [response] });
      }
    }
  }
}

// https://open.spotify.com/track/4zfACDG50SflIzKurjd8B0?si=a778fe9dddf24cf2
