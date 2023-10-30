import { IdleState } from "./State/IdleState";
import { JumpingState } from "./State/JumpingState";
import { WalkingState } from "./State/WalkingState";
import { FallingState } from "./State/FallingState";

export class Player {
  constructor(x, y, width, height, other, imgSrc, { animations }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.idleState = new IdleState();
    this.walkingState = new WalkingState();
    this.jumpingState = new JumpingState();
    this.fallingState = new FallingState();
    this.currState = this.idleState;
    this.velocityX = 0;
    this.velocityY = 0;
    this.others = other;
    this.sprite = new Image();
    this.framerate = 11;
    this.sprite.src = imgSrc;
    this.frameBuffer = 4;
    this.frameElapsed = 0;
    this.sprite.onload = () => {
      this.loaded = true;
      this.width = this.sprite.width / this.framerate;
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

    this.currState.update(this, manager);
  }

  render(ctx) {
    // ctx.fillStyle = "blue";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    if (this.loaded == false) return;
    const cropbox = {
      position: {
        x: this.width * this.currentFrame,
        y: 0,
      },
      width: this.width,
      height: this.height,
    };

    ctx.fillRect(
      this.hitbox.position.x,
      this.hitbox.position.y,
      this.hitbox.width,
      this.hitbox.height
    );

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
        x: this.x + 10,
        y: this.y + 15,
      },
      width: 35,
      height: 35,
    };
  }

  updateFrames() {
    this.frameElapsed++;
    if (this.frameElapsed % this.frameBuffer === 0) {
      if (this.currentFrame < this.framerate - 1) {
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
        console.log(offset);
        console.log(other.y);
        console.log(this.y);
        console.log(this.height);

        this.y = other.y - offset - 0.01;
        console.log(this.y);
      }
      this.setState(this.idleState);
    }
  }

  setState(newState) {
    this.currState = newState;
    this.currState.enter(this);
  }
}
