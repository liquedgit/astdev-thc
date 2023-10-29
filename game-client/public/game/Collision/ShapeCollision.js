export class ShapeCollision {
    constructor(_x, _y, _width, _height) {
        this._x = _x;
        this._y = _y;
        this._width = _width;
        this._height = _height;
    }
    set x(x) {
        this._x = x;
    }
    set y(y) {
        this._y = y;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    collidesWith(other) {
        return (this._x <= other.x + other.width &&
            this._x + this._width >= other.x &&
            this._y <= other.y + other.height &&
            this._y + this._height >= other.y);
    }
}
