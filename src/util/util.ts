import { DEVO_CONFIG, PROD_CONFIG } from "../config";
import Config from "../interfaces/Config";

export function getConfiguration(): Config {
  const stage = process.env.STAGE || "TEST";
  return stage === "PROD" ? PROD_CONFIG : DEVO_CONFIG;
}
