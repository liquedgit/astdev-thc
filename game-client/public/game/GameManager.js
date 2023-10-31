import { PARSED_COLLISION_LEVEL_1 } from "./Collision/ConstantCollision";
import { Stage } from "./Stage/Stage";
export class GameManager {
  constructor() {
    this.keys = {};
    this._canvas = document.querySelector("canvas");
    this._canvas.width = 1024;
    this._canvas.height = 500;
    this._ctx = this._canvas.getContext("2d");
    this._stages = [
      new Stage({
        position: {
          x: 0,
          y: 0,
        },
        imgSrc: "../assets/background/backgroundLevel1.png",
        parsedCollision: PARSED_COLLISION_LEVEL_1,
      }),
      new Stage({
        position: {
          x: 0,
          y: 0,
        },
        imgSrc: "../assets/background/backgroundLevel2.png",
        parsedCollision: PARSED_COLLISION_LEVEL_1,
      }),
      new Stage({
        position: {
          x: 0,
          y: 0,
        },
        imgSrc: "../assets/background/backgroundLevel3.png",
        parsedCollision: PARSED_COLLISION_LEVEL_1,
      }),
    ];
    this._currentStages = this._stages[0];
    this._gravity = 2;
    document.addEventListener("keydown", (event) => {
      this.keys[event.code] = true;
    });
    document.addEventListener("keyup", (event) => {
      this.keys[event.code] = false;
    });
  }
  isKeyPressed(keyCode) {
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
