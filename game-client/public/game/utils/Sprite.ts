import {  GameManager } from "../GameManager";

export class Sprite{
    
    private _image : HTMLImageElement;
    private _x : number;
    private _y : number
    private _loaded : boolean;
    constructor({ position, imgSrc } : any){
        this._x = position.x;
        this._y = position.y;
        this._image = new Image()!;
        this._image.onload=()=>this._loaded = true
        this._image.src = imgSrc
        this._loaded = false
    }

    update(manager: GameManager): void {
        // throw new Error("Method not implemented.");
    }
    render(ctx: CanvasRenderingContext2D): void {
        // throw new Error("Method not implemented.");
        if(this._loaded == false)return
        ctx.drawImage(this._image, this._x, this._y);
    }
}