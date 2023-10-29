import { GameManager } from "../GameManager";
import { Player } from "./Player";

export abstract class PlayerBaseState {
  abstract enter(player : Player) : void;

  abstract update(player : Player, manager : GameManager) : void;
}
