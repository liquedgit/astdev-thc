import { PlayerBaseState } from "../PlayerBaseState";
export class JumpingState extends PlayerBaseState {
  generateRandomNumberWithZeroPrefix(max) {
    const num = Math.floor(Math.random() * max) + 1;
    return num < 10 ? "0" + num : num.toString();
  }

  enter(player) {
    // throw new Error("Method not implemented.");
    let path = `../../../assets/audio/8_BIT_[50_SFX]_Jump_Free_Sound_Effects_N1_BY_jalastram/SFX_Jump_08.wav`;
    var audio = new Audio(path);
    audio.play();
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
