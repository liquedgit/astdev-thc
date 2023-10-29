import { GameManager } from "../../GameManager";
import { Player } from "../Player";
import { PlayerBaseState } from "../PlayerBaseState";
export class IdleState extends PlayerBaseState {

  update(player: Player, manager: GameManager): void {
    
    if(manager.isKeyPressed("KeyD") || manager.isKeyPressed("KeyA")){
      player.setState(player.walkingState)
      return
    }else if((manager.isKeyPressed("Space") || manager.isKeyPressed("KeyW"))){
      player.setState(player.jumpingState)
      return
  }

    let other = player.checkCollide()
    if(!other){
      player.setState(player.fallingState)
    }


    }

  enter(player: Player): void {
    // throw new Error("Method not implemented.");
    player.velocityY = 0;
  }
  

}
