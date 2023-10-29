// import {  Player  } from './player/Player'

// export const canvas = document.querySelector("canvas")!;
// const ctx = canvas.getContext("2d")!;

// canvas.width = 1024;
// canvas.height = 725;

// console.log(window.innerWidth);
// console.log(window.innerHeight);

// ctx.fillStyle = "white";
// ctx.fillRect(0, 0, canvas.width, canvas.height);

// let player = new Player(100,100,50,50,20);

// function animate() {
//   requestAnimationFrame(animate);
//   player.update(ctx);
// }

// animate();

declare global {
    interface Array<T> {
        parse2D(): T[][];
    }
}


import { GameManager } from "./GameManager";
const manager = new GameManager();
manager.run()
