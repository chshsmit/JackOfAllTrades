import Command from "../interfaces/Command";
import Bangerz from "./Bangerz";
import Book from "./Book";
import EightBall from "./EightBall";
import Help from "./Help";
import RandomName from "./RandomName";
import RollDice from "./RollDice";

export const COMMANDS: Command[] = [
  new RollDice(),
  new Bangerz(),
  new Book(),
  new RandomName(),
  new EightBall(),
  new Help(),
];
