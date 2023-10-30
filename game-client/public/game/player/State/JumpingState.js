import { PlayerBaseState } from "../PlayerBaseState";
export class JumpingState extends PlayerBaseState {
  enter(player) {
    // throw new Error("Method not implemented.");
    if (player.velocityY === 0) {
      player.velocityY = -10;
    }
  }
  update(player, manager) {
    if (player.velocityY >= 0) {
      player.setState(player.fallingState);
      return;
    }
    player.x += player.velocityX;
    player.playerHitbox();

    player.collideX();
    player.velocityY += 0.5;
    player.y += player.velocityY;
    player.playerHitbox();

    player.collideY();
  }
}
