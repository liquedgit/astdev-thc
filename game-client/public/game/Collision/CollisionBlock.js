export class CollisionBlock {
  constructor({ position }) {
    this._x = position.x;
    this._y = position.y;
    this._height = 64;
    this._width = 64;
  }
  get width() {
    return this._width;
  }
  set width(w) {
    this._width = w;
  }
  get height() {
    return this._height;
  }
  set height(h) {
    this._height = h;
  }
  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  set x(x) {
    this._x = x;
  }
  set y(y) {
    this._y = y;
  }
  update(manager) {}
  render(ctx) {
    // ctx.fillStyle = 'red';
    // ctx.fillRect(this._x, this._y, this._width, this._height);
  }
}
