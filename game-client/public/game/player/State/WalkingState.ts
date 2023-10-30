import { PlayerBaseState } from "../PlayerBaseState";
import { Player } from "../Player";
import { GameManager } from "../../GameManager";
export class WalkingState extends PlayerBaseState {
  enter(player: Player): void {
    
  }
  
  update(player: Player, manager: GameManager): void {
    if(player.velocityX == 0){
      player.setState(player.idleState)
      return
    }
    
    
    player.x += player.velocityX
    player.collideX()

  }

}
