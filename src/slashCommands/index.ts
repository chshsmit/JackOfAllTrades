import Command from "../interfaces/Command";
import Bangerz from "./Bangerz";
import Ping from "./Ping";
import RollDice from "./RollDice";

export const COMMANDS: Command[] = [new Ping(), new RollDice(), new Bangerz()];
