import { PlayerBaseState } from "../PlayerBaseState";
import { JumpingState } from "./JumpingState";
import { WalkingState } from "./WalkingState";
export class IdleState extends PlayerBaseState {
  update(player, manager) {
    if (manager.isKeyPressed("KeyD") || manager.isKeyPressed("KeyA")) {
      player.setState(player.walkingState);
      return;
    } else if (manager.isKeyPressed("Space") || manager.isKeyPressed("KeyW")) {
      player.setState(player.jumpingState);
      return;
    }
    player.playerHitbox();
    let other = player.checkGroundCollide();
    if (!other) {
      player.setState(player.fallingState);
    }
  }
  enter(player) {
    // throw new Error("Method not implemented.");
    if (player.lastDirection === "left") {
      player.setSprite(player.animations["idleLeft"]);
    } else if (player.lastDirection === "right") {
      player.setSprite(player.animations["idleRight"]);
    }
    player.velocityY = 0;
  }
}
