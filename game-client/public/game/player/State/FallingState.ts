import { GameManager } from "../../GameManager";
import { Player } from "../Player";
import { PlayerBaseState } from "../PlayerBaseState";

export class FallingState extends PlayerBaseState{
    enter(player: Player): void {
    }

    update(player: Player, manager: GameManager): void {
        player.x += player.velocityX

        player.collideX()
        player.y += player.velocityY + manager.gravity
        player.velocityY += 0.2
        player.collideY()
        
    }

    
    
}