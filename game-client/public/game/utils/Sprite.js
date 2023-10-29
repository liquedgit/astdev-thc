export class Sprite {
    constructor({ position, imgSrc }) {
        this._x = position.x;
        this._y = position.y;
        this._image = new Image();
        this._image.onload = () => this._loaded = true;
        this._image.src = imgSrc;
        this._loaded = false;
    }
    update(manager) {
        // throw new Error("Method not implemented.");
    }
    render(ctx) {
        // throw new Error("Method not implemented.");
        if (this._loaded == false)
            return;
        ctx.drawImage(this._image, this._x, this._y);
    }
}
