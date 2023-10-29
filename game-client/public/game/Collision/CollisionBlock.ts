import { Entity, GameManager } from "../GameManager";

export class CollisionBlock implements Entity{
    private _x : number;
    private _y : number;
    private _width : number;
    private _height : number;
    constructor({position} : any){
        this._x = position.x
        this._y = position.y
        this._height = 64
        this._width = 64
    }

    
    public get width() : number {
        return this._width
    }
    
    public set width(w : number) {
        this._width = w;
    }
    
    public get height() : number{
        return this._height
    }    

    public set height(h : number){
        this._height = h
    }

    
    public get x() : number {
        return this._x
    }
    
    public get y() : number{
        return this._y
    }

    
    public set x(x : number) {
        this._x = x;
    }

    public set y (y : number){
        this._y = y;
    }
    

    update(manager: GameManager): void {
    }

    render(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'red'

        ctx.fillRect(this._x, this._y, this._width, this._height)    
    }

    
}