import { IdleState } from "./State/IdleState";
import { JumpingState } from "./State/JumpingState";
import { WalkingState } from "./State/WalkingState";
import { FallingState } from "./State/FallingState";
import { Door } from "../Door/Door";
import { Sign } from "../Sign/Sign";

export class Player {
  GROUND_TOLERANCE = 0.25;

  constructor(x, y, width, height, other, { animations }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.idleState = new IdleState();
    this.walkingState = new WalkingState();
    this.jumpingState = new JumpingState();
    this.fallingState = new FallingState();
    this.currState = this.idleState;
    this.lastState = this.idleState;
    this.velocityX = 0;
    this.velocityY = 0;
    this.others = other;
    this.sprite = new Image();
    this.animations = animations;
    this.frameRate = this.animations["idleRight"].frameRate;
    this.sprite.src = this.animations["idleRight"].imgSrc;
    this.frameBuffer = this.animations["idleRight"].frameBuffer;
    this.frameElapsed = 0;
    this.sprite.onload = () => {
      this.loaded = true;
      this.width = this.sprite.width / this.frameRate;
      this.height = this.sprite.height;
    };
    this.currentFrame = 0;
    this.loaded = false;
    this.lastDirection = "right";
  }

  update(manager) {
    if (manager.isKeyPressed("KeyA")) {
      this.velocityX = -5;
    } else if (manager.isKeyPressed("KeyD")) {
      this.velocityX = 5;
    } else {
      this.velocityX = 0;
    }

    this.playerHitbox();
    // console.log(this.hitbox);
    for (let other of this.others) {
      if (
        this.hitbox.position.x <= other._x + other.width &&
        this.hitbox.position.x + this.hitbox.width >= other._x &&
        this.hitbox.position.y <= other._y + other.height &&
        this.hitbox.position.y + this.hitbox.height >= other._y
      ) {
        if (other instanceof Door) {
          if (!other.autoplay) {
            other.play();
          }
          if (manager.isKeyPressed("KeyE")) {
            other.moveStage(manager);
          }
        } else if (other instanceof Sign) {
          other.playSound();
          other.showModal(manager);
          let deletedObj = other;
          this.others = this.others.filter(
            (deleted) => !(deleted instanceof Sign && deleted === deletedObj)
          );
          manager._currentStages.removeSign(deletedObj);
        }
      }
    }

    this.currState.update(this, manager);
  }

  render(ctx) {
    // ctx.fillStyle = "blue";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    // console.log(this.loaded);
    // console.log(this.currState);
    if (this.loaded == false) return;
    const cropbox = {
      position: {
        x: this.width * this.currentFrame,
        y: 0,
      },
      width: this.width,
      height: this.height,
    };

    // ctx.fillRect(
    //   this.hitbox.position.x,
    //   this.hitbox.position.y,
    //   this.hitbox.width,
    //   this.hitbox.height
    // );

    ctx.drawImage(
      this.sprite,
      cropbox.position.x,
      cropbox.position.y,
      cropbox.width,
      cropbox.height,
      this.x,
      this.y,
      this.width,
      this.height
    );

    this.updateFrames();
  }

  playerHitbox() {
    this.hitbox = {
      position: {
        x: this.x + 55,
        y: this.y + 35,
      },
      width: 60,
      height: 55,
    };
  }

  updateFrames() {
    this.frameElapsed++;
    if (this.frameElapsed % this.frameBuffer === 0) {
      if (this.currentFrame < this.frameRate - 1) {
        // console.log(this.currentFrame);
        this.currentFrame++;
      } else {
        this.currentFrame = 0;
      }
    }
  }

  checkCollide() {
    for (let other of this.others) {
      if (
        this.hitbox.position.x <= other.x + other.width &&
        this.hitbox.position.x + this.hitbox.width >= other.x &&
        this.hitbox.position.y <= other.y + other.height &&
        this.hitbox.position.y + this.hitbox.height >= other.y
      ) {
        return other;
      }
    }
    return null;
  }

  checkGroundCollide() {
    for (let other of this.others) {
      if (
        this.hitbox.position.x <= other.x + other.width &&
        this.hitbox.position.x + this.hitbox.width >= other.x &&
        this.hitbox.position.y <= other.y + other.height &&
        this.hitbox.position.y + this.hitbox.height + this.GROUND_TOLERANCE >=
          other.y
      ) {
        return other;
      }
    }
    return null;
  }

  collideX() {
    let other = this.checkCollide();
    if (other) {
      if (this.velocityX < -1) {
        const offset = this.hitbox.position.x - this.x;
        this.x = other.x + other.width - offset + 0.25;
      } else if (this.velocityX > 1) {
        const offset = this.hitbox.position.x - this.x + this.hitbox.width;
        this.x = other.x - offset - 0.25;
      }
    }
  }

  collideY() {
    let other = this.checkCollide();
    if (other) {
      if (this.velocityY < 0) {
        this.velocityY = 0;
        const offset = this.hitbox.position.y - this.y;
        this.y = other.y + other.height - offset + 0.5;
      } else if (this.velocityY > 0) {
        this.velocityY = 0;
        const offset = this.hitbox.position.y - this.y + this.hitbox.height;

        this.y = other.y - offset - 0.01;
      }
      // this.setState(this.idleState);
    }
  }

  setSprite(animation) {
    this.frameBuffer = animation.frameBuffer;
    this.frameRate = animation.frameRate;
    this.sprite.src = animation.imgSrc;
    this.loaded = false;
  }

  setState(newState) {
    if (newState != this.currState) {
      this.currState = newState;
      this.currState.enter(this);
    }
  }
}
