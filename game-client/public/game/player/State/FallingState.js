import { PlayerBaseState } from "../PlayerBaseState";
export class FallingState extends PlayerBaseState {
    enter(player) {
    }
    update(player, manager) {
        player.x += player.velocityX;
        player.collideX();
        player.y += player.velocityY + manager.gravity;
        player.velocityY += 0.2;
        player.collideY();
    }
}
