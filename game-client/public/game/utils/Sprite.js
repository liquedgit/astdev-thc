export class Sprite {
  constructor({ position, sprite, autoplay = true }) {
    this._x = position.x;
    this._y = position.y;
    this._image = new Image();
    this.frameRate = sprite.frameRate;
    this.frameBuffer = sprite.frameBuffer;
    this._image.src = sprite.imgSrc;
    this.loop = sprite.loop;
    console.log(this.frameRate);
    this._image.onload = () => {
      this._loaded = true;
      this.width = this._image.width / this.frameRate;
      this.height = this._image.height;
    };

    this._loaded = false;
    this.elapsedFrames = 0;
    this.currentFrame = 0;
    this.autoplay = autoplay;
  }
  update(manager) {
    // throw new Error("Method not implemented.");
  }
  render(ctx) {
    // throw new Error("Method not implemented.");
    if (this._loaded == false) return;
    const cropbox = {
      position: {
        x: this.width * this.currentFrame,
        y: 0,
      },
      width: this.width,
      height: this.height,
    };

    // ctx.drawImage(this._image, this._x, this._y, this.width, this.height);
    if (this.frameRate == 4) {
    }
    ctx.drawImage(
      this._image,
      cropbox.position.x,
      cropbox.position.y,
      cropbox.width,
      cropbox.height,
      this._x,
      this._y,
      this.width,
      this.height
    );
    this.updateFrames();
  }

  play() {
    this.autoplay = true;
  }

  updateFrames() {
    if (!this.autoplay) return;
    this.elapsedFrames++;
    if (this.elapsedFrames % this.frameBuffer == 0) {
      if (this.currentFrame < this.frameRate - 1) {
        this.currentFrame++;
      } else if (this.loop) {
        console.log("asas");
        this.currentFrame = 0;
      }
    }
  }
}
