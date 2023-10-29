import { ShapeCollision } from "../Collision/ShapeCollision";
import { IdleState } from "./State/IdleState";
import { JumpingState } from "./State/JumpingState";
import { WalkingState } from "./State/WalkingState";
import { FallingState } from "./State/FallingState";
export class Player extends ShapeCollision {
    constructor(x, y, width, height, other) {
        super(x, y, width, height);
        this._idleState = new IdleState();
        this._walkingState = new WalkingState();
        this._jumpingState = new JumpingState();
        this._fallingState = new FallingState();
        this._currState = this._idleState;
        this._velocityX = 0;
        this._velocityY = 0;
        this._others = other;
    }
    update(manager) {
        if (manager.isKeyPressed("KeyA")) {
            this._velocityX = -5;
        }
        else if (manager.isKeyPressed("KeyD")) {
            this._velocityX = 5;
        }
        else {
            this._velocityX = 0;
        }
        this._currState.update(this, manager);
    }
    render(ctx) {
        // console.log(this._y)
        // console.log(this._x)
        ctx.fillStyle = "blue";
        ctx.fillRect(this._x, this._y, this._width, this._height);
    }
    checkCollide() {
        for (let other of this.others) {
            if (this.collidesWith(other)) {
                return other;
            }
        }
        return null;
    }
    collideX() {
        let other = this.checkCollide();
        if (other) {
            if (this.velocityX < -1) {
                this.x = other.x + other.width + 0.25;
            }
            else if (this.velocityX > 1) {
                this.x = other.x - this.width - 0.25;
            }
        }
    }
    collideY() {
        let other = this.checkCollide();
        if (other) {
            if (this.velocityY < 0) {
                this.velocityY = 0;
                this.y = other.y + other.height + 0.01;
            }
            else if (this.velocityY > 0) {
                this.velocityY = 0;
                this.y = other.y - this.height - 0.01;
            }
            this.velocityY = 0;
            this.setState(this.idleState);
        }
    }
    get others() {
        return this._others;
    }
    get fallingState() {
        return this._fallingState;
    }
    get velocityX() {
        return this._velocityX;
    }
    get velocityY() {
        return this._velocityY;
    }
    set velocityY(velocY) {
        this._velocityY = velocY;
    }
    set velocityX(velocX) {
        this._velocityX = velocX;
    }
    get idleState() {
        return this._idleState;
    }
    get walkingState() {
        return this._walkingState;
    }
    get jumpingState() {
        return this._jumpingState;
    }
    setState(newState) {
        this._currState = newState;
        this._currState.enter(this);
    }
}
