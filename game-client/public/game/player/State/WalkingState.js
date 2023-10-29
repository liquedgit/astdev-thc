import { PlayerBaseState } from "../PlayerBaseState";
export class WalkingState extends PlayerBaseState {
    enter(player) {
        // throw new Error("Method not implemented.");
        //ToDo : Change player animation
    }
    update(player, manager) {
        if (player.velocityX == 0) {
            player.setState(player.idleState);
            return;
        }
        let other = player.checkCollide();
        if (!other) {
            player.setState(player.fallingState);
        }
        player.x += player.velocityX;
        player.collideX();
    }
}
