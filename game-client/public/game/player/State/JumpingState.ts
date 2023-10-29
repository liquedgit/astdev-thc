import { GameManager } from "../../GameManager";
import { Player } from "../Player";
import { PlayerBaseState } from "../PlayerBaseState";

export class JumpingState extends PlayerBaseState {
  
  enter(player: Player): void {
    // throw new Error("Method not implemented.");
    if(player.velocityY === 0){
      player.velocityY = -10
    }
  }

  update(player: Player, manager: GameManager): void {
    
    if(player.velocityY >= 0){
      player.setState(player.fallingState)
      return
    }

    player.x += player.velocityX
    
    player.collideX()
    player.velocityY += 0.5;
    player.y += player.velocityY
    
    player.collideY();

  }


  

}
