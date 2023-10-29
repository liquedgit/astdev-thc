import { PlayerBaseState } from "../PlayerBaseState";
import { Player } from "../Player";
import { GameManager } from "../../GameManager";
export class WalkingState extends PlayerBaseState {
  enter(player: Player): void {
    // throw new Error("Method not implemented.");
    //ToDo : Change player animation
  }
  update(player: Player, manager: GameManager): void {
    if(player.velocityX == 0){
      player.setState(player.idleState)
      return
    }
    let other = player.checkCollide()
    if(!other){
      player.setState(player.fallingState)
    }    
    
    player.x += player.velocityX
    player.collideX()

  }

}
