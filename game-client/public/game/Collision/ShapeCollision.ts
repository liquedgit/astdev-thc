export class ShapeCollision {
  protected _x : number;
  protected _y : number;
  protected _width : number;
  protected _height : number;

  constructor(_x : number, _y : number, _width : number, _height :number) {
    this._x = _x;
    this._y = _y;
    this._width = _width;
    this._height = _height;
  }

  
  public set x(x : number) {
    this._x = x;
  }
  
  public set y(y :number){
    this._y = y;
  }
  
  public get x() : number {
    return this._x
  }

  public get y(): number{
    return this._y
  }

  public get width():number{
    return this._width
  }

  public get height():number{
    return this._height
  }
  

  collidesWith(other :any) {
    return (
      this._x <= other.x + other.width &&
      this._x + this._width >= other.x &&
      this._y <= other.y + other.height &&
      this._y + this._height >= other.y
    );
  }
}
