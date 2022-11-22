import { google } from "googleapis";

export default class GoogleApiController {
  scopes: string[];
  baseYoutubeUrl: string;
  creds: string;

  constructor() {
    this.baseYoutubeUrl =
      "https://www.googleapis.com/youtube/v3/videos?id={video_id}&key={key}&part=snippet";

    this.scopes = [
      "https://www.googleapis.com/auth/youtube",
      "https://www.googleapis.com/auth/youtubepartner",
      "https://www.googleapis.com/auth/youtube.force-ssl",
      "https://spreadsheets.google.com/feeds",
      "https://www.googleapis.com/auth/drive",
    ];
  }

  async getVideoTitle(videoId: string): Promise<string | null | undefined> {
    const auth = new google.auth.GoogleAuth({
      keyFile: "creds.json",
      scopes: this.scopes,
    });

    const youtube = google.youtube({
      version: "v3",
      auth: auth,
    });

    const res = await youtube.videos.list({
      id: [videoId],
      part: ["id", "snippet"],
    });

    if (res.data.items === undefined) return "";

    return res.data.items![0].snippet!.title;
  }

  async addSongToSheet(videoTitle: string, videoUrl: string) {
    const auth = new google.auth.GoogleAuth({
      keyFile: "creds.json",
      scopes: this.scopes,
    });

    const sheets = google.sheets({
      version: "v4",
      auth: auth,
    });

    const values = [[videoUrl, videoTitle]];

    await sheets.spreadsheets.values.append({
      spreadsheetId: "1_Gb1JCPOYxbW_5qR8KZgvfBAbCZQ3ps5H377Ph2-Q_g",
      range: "A2:B",
      valueInputOption: "RAW",
      requestBody: {
        values,
      },
    });

    return 1;
  }
}
