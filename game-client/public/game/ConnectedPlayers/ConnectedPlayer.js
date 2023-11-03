export class ConnectedPlayer {
  constructor(x, y, width, height, id, currentStage) {
    this.x = x;
    this.id = id;
    this.current_stage = currentStage;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sprite = new Image();
    this.frameRate = 11;
    this.loaded = false;
    this.sprite.src = "../../assets/Sprites/01-King Human/idle.png";
    this.currentFrame = 0;
    this.sprite.onload = () => {
      this.loaded = true;
      this.width = this.sprite.width / this.frameRate;
      this.height = this.sprite.height;
    };
  }

  update(manager) {}

  render(ctx) {
    if (this.loaded == false) return;
    const cropbox = {
      position: {
        x: this.width,
        y: 0,
      },
      width: this.width,
      height: this.height,
    };

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
    // ctx.fillStyle = "red";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
