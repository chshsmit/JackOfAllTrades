import { DEVO_CONFIG, PROD_CONFIG } from "../config";
import Config from "../interfaces/Config";
import axios, { AxiosError } from "axios";

export function getConfiguration(): Config {
  const stage = process.env.STAGE || "TEST";
  return stage === "PROD" ? PROD_CONFIG : DEVO_CONFIG;
}

export function getPageHtmlData(url: string): Promise<string | undefined> {
  const HTMLData = axios
    .get(url)
    .then((res) => res.data)
    .catch((error: AxiosError) => {
      console.log(error);
    });

  return HTMLData;
}

export function cleanString(str: string): string {
  const lineBreaksRemoved = str.replace(/[\r\n]/gm, "");
  return lineBreaksRemoved.trim();
}
