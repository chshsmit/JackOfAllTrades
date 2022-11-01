import Command from "../interfaces/Command";
import Bangerz from "./Bangerz";
import RollDice from "./RollDice";

export const COMMANDS: Command[] = [new RollDice(), new Bangerz()];
