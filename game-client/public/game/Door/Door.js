import { Sprite } from "../utils/Sprite";

export class Door extends Sprite {
  constructor({ position, sprite }) {
    super({ position, sprite, autoplay: false });
    this.moved = false;
  }

  moveStage(manager) {
    this.moved = true;
    manager.indexStage++;
    manager._currentStages = manager._stages[manager.indexStage];
    manager.backendPlayers = [];
  }
}
