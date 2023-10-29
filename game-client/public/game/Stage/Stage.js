import { CollisionBlock } from "../Collision/CollisionBlock";
import { Player } from "../player/Player";
import { Sprite } from "../utils/Sprite";
export class Stage extends Sprite {
    constructor({ position, imgSrc, parsedCollision }) {
        super({ position, imgSrc });
        this._entities = [];
        parsedCollision.forEach((row, y) => {
            row.forEach((symbol, x) => {
                if (symbol == 292) {
                    this._entities.push(new CollisionBlock({
                        position: {
                            x: x * 64,
                            y: y * 64
                        }
                    }));
                }
            });
        });
        this._entities.push(new Player(200, 200, 25, 25, this._entities.slice()));
    }
    addEntities(newEntity) {
        this._entities.push(newEntity);
    }
    update(manager) {
        super.update(manager);
        for (let entity of this._entities) {
            entity.update(manager);
        }
    }
    render(ctx) {
        super.render(ctx);
        for (let entity of this._entities) {
            entity.render(ctx);
        }
    }
}
