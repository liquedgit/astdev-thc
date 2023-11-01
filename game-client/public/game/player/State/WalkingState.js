import { PlayerBaseState } from "../PlayerBaseState";
export class WalkingState extends PlayerBaseState {
  enter(player) {
    if (player.velocityX > 0) {
      player.setSprite(player.animations["runRight"]);
      player.lastDirection = "right";
    } else if (player.velocityX < 0) {
      player.setSprite(player.animations["runLeft"]);
      player.lastDirection = "left";
    }
  }
  update(player, manager) {
    if (player.velocityX == 0) {
      player.setState(player.idleState);
      return;
    }
    player.x += player.velocityX;
    player.playerHitbox();
    player.collideX();
    player.y += player.velocityY + manager.gravity;
    player.velocityY += 0.2;
    player.playerHitbox();
    player.collideY();
  }
}
