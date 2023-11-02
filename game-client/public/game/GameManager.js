import { PARSED_COLLISION_LEVEL_2 } from "./Collision/ConstantCollision";
import { PARSED_COLLISION_LEVEL_3 } from "./Collision/ConstantCollision";
import { PARSED_COLLISION_LEVEL_1 } from "./Collision/ConstantCollision";
import { Stage } from "./Stage/Stage";
export class GameManager {
  constructor() {
    this.keys = {};
    this._canvas = document.querySelector("canvas");
    this._canvas.width = window.innerWidth - 100;
    this._canvas.height = 1024;
    this._ctx = this._canvas.getContext("2d");
    this._ctx.scale(1.2, 1.2);
    this._stages = [
      new Stage({
        signs: [
          {
            position: {
              x: 577,
              y: 350,
            },
            modalid: "advModal",
          },
          {
            position: {
              x: 377,
              y: 350,
            },
            modalid: "profileModal",
          },
        ],
        player: {
          position: {
            x: 150,
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
        signs: [
          {
            position: {
              x: 600,
              y: 473,
            },
            modalid: "inovationModal",
          },
          {
            position: {
              x: 500,
              y: 473,
            },
            modalid: "workplanModal2",
          },
          {
            position: {
              x: 400,
              y: 473,
            },
            modalid: "workplanModal",
          },
        ],
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
        signs: [
          {
            position: {
              x: 600,
              y: 373,
            },
            modalid: "newTpaModal",
          },
          {
            position: {
              x: 400,
              y: 372,
            },
            modalid: "whyMeModal",
          },
        ],
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
  }
  render() {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    // this._ctx.fillStyle = "black";
    // this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
    this._currentStages.render(this._ctx);
  }
  run() {
    this.update();
    this.render();
    this.animate = requestAnimationFrame(this.run.bind(this));
  }

  resume() {
    this.isPaused = false;
  }

  pause() {
    cancelAnimationFrame(this.animate);
    this.isPaused = true;
  }
}
