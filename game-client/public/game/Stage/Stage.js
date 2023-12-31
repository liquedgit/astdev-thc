import { CollisionBlock } from "../Collision/CollisionBlock";
import { Door } from "../Door/Door";
import { Sign } from "../Sign/Sign";
import { Player } from "../player/Player";
import { Sprite } from "../utils/Sprite";
export class Stage extends Sprite {
  constructor({ signs, player, door, position, sprite, parsedCollision }) {
    super({ position, sprite });
    this._entities = [];
    parsedCollision.forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (symbol == 292) {
          this._entities.push(
            new CollisionBlock({
              position: {
                x: x * 64,
                y: y * 64,
              },
            })
          );
        }
      });
    });
    for (let sign of signs) {
      this._entities.push(
        new Sign({
          modalid: sign.modalid,
          position: {
            x: sign.position.x,
            y: sign.position.y,
          },
          sprite: {
            frameBuffer: 10,
            frameRate: 10,
            imgSrc:
              "../../assets/Sprites/12-Live and Coins/Big Diamond Idle (18x14).png",
            loop: true,
          },
          autoplay: true,
        })
      );
    }
    this._entities.push(
      new Door({
        position: {
          x: door.position.x,
          y: door.position.y,
        },
        sprite: {
          frameBuffer: 20,
          frameRate: 5,
          imgSrc: "../../assets/Sprites/11-Door/doorOpen.png",
          loop: false,
        },
      })
    );
    this._entities.push(
      new Player(
        player.position.x,
        player.position.y,
        25,
        25,
        this._entities.slice(),
        {
          animations: {
            idleRight: {
              frameRate: 11,
              frameBuffer: 5,
              imgSrc: "../../assets/Sprites/01-King Human/idle.png",
            },
            idleLeft: {
              frameRate: 11,
              frameBuffer: 5,
              imgSrc: "../../assets/Sprites/01-King Human/idleLeft.png",
            },
            runLeft: {
              frameRate: 8,
              frameBuffer: 10,
              imgSrc: "../../assets/Sprites/01-King Human/runLeft.png",
            },
            runRight: {
              frameRate: 8,
              frameBuffer: 10,
              imgSrc: "../../assets/Sprites/01-King Human/runRight.png",
            },
          },
        }
      )
    );
  }

  removeSign(obj) {
    this._entities = this._entities.filter(
      (other) => !(other instanceof Sign && other === obj)
    );
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
