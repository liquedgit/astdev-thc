import { PARSED_COLLISION_LEVEL_2 } from "./Collision/ConstantCollision";
import { PARSED_COLLISION_LEVEL_3 } from "./Collision/ConstantCollision";
import { PARSED_COLLISION_LEVEL_1 } from "./Collision/ConstantCollision";
import { Stage } from "./Stage/Stage";
export class GameManager {
  constructor() {
    this.keys = {};
    this._canvas = document.querySelector("canvas");
    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;
    this._ctx = this._canvas.getContext("2d");
    this._stages = [
      new Stage({
        player: {
          position: {
            x: 290,
            y: 290,
          },
        },
        door: {
          position: {
            x: 738,
            y: 273,
          },
        },
        position: {
          x: 0,
          y: 0,
        },
        sprite: {
          frameBuffer: 1,
          frameRate: 1,
          loop: false,
          imgSrc: "../assets/background/backgroundLevel1.png",
        },
        parsedCollision: PARSED_COLLISION_LEVEL_1,
      }),
      new Stage({
        player: {
          position: {
            x: 100,
            y: 100,
          },
        },
        door: {
          position: {
            x: 768,
            y: 334,
          },
        },
        position: {
          x: 0,
          y: 0,
        },
        sprite: {
          frameBuffer: 1,
          frameRate: 1,
          loop: false,
          imgSrc: "../assets/background/backgroundLevel2.png",
        },
        parsedCollision: PARSED_COLLISION_LEVEL_2,
      }),
      new Stage({
        player: {
          position: {
            x: 647,
            y: 300,
          },
        },
        door: {
          position: {
            x: 175,
            y: 337,
          },
        },
        position: {
          x: 0,
          y: 0,
        },
        sprite: {
          frameBuffer: 1,
          frameRate: 1,
          loop: false,
          imgSrc: "../assets/background/backgroundLevel3.png",
        },
        parsedCollision: PARSED_COLLISION_LEVEL_3,
      }),
    ];
    this.indexStage = 0;
    this._currentStages = this._stages[this.indexStage];
    this._gravity = 2;
    document.addEventListener("keydown", (event) => {
      // console.log(event.code);
      this.keys[event.code] = true;
    });
    document.addEventListener("keyup", (event) => {
      this.keys[event.code] = false;
    });
  }
  isKeyPressed(keyCode) {
    if (keyCode === "KeyE") console.log(this.keys[keyCode]);
    return this.keys[keyCode] === true;
  }
  get gravity() {
    return this._gravity;
  }
  get canvas() {
    return this._canvas;
  }
  update() {
    this._currentStages.update(this);
    // console.log(this._currentStages)
  }
  render() {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    this._ctx.fillStyle = "white";
    this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
    this._currentStages.render(this._ctx);
  }
  run() {
    this.update();
    this.render();
    requestAnimationFrame(this.run.bind(this));
  }
}
