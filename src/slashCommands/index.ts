import Command from "../interfaces/Command";
import Bangerz from "./Bangerz";
import Help from "./Help";
import RollDice from "./RollDice";

export const COMMANDS: Command[] = [new RollDice(), new Bangerz(), new Help()];
