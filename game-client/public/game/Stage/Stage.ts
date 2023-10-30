import { CollisionBlock } from "../Collision/CollisionBlock";
import { Entity, GameManager } from "../GameManager";
import { Player } from "../player/Player";
import { Sprite } from "../utils/Sprite";

export class Stage extends Sprite{

    private _entities : Entity[]

    constructor({position, imgSrc, parsedCollision} : any){
        super({position,imgSrc});

        this._entities = [];
        parsedCollision.forEach((row : number[], y : number)=>{
            row.forEach((symbol : number, x : number)=>{
                if(symbol == 292){
                    this._entities.push(new CollisionBlock({
                        position:{
                            x : x * 64,
                            y : y * 64
                        }
                    }))
                }
            })
        })
        this._entities.push(new Player(200,200,25,25, this._entities.slice(), '../../assets/Sprites/01-King Human/Idle (78x58).png'))
    }

    public addEntities(newEntity : Entity){
        this._entities.push(newEntity);
    }


    update(manager: GameManager): void {
        super.update(manager)
        for(let entity of this._entities){
            entity.update(manager)
        }
    }

    render(ctx: CanvasRenderingContext2D): void {
        super.render(ctx)
        for(let entity of this._entities){
            entity.render(ctx)
        }
    }


}