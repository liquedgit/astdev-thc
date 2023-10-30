import { ShapeCollision } from "../Collision/ShapeCollision";
import { PlayerBaseState } from "./PlayerBaseState";
import { IdleState } from "./State/IdleState";
import { JumpingState } from "./State/JumpingState";
import { WalkingState } from "./State/WalkingState";
import { Entity, GameManager } from "../GameManager";
import { FallingState } from "./State/FallingState";


export class Player extends ShapeCollision implements Entity {
  private _idleState : IdleState;
  private _walkingState : WalkingState;
  private _jumpingState : JumpingState;
  private _currState : PlayerBaseState;
  private _velocityY : number;
  private _velocityX :number;
  private _fallingState : FallingState;
  private _others : Entity[]
  private _sprite : HTMLImageElement;
  private _loaded : boolean;
  private _framerate :number;
  private _currentFrame :number;
  private _frameBuffer :number;
  private _frameElapsed :number;


  constructor(x : number, y : number, width : number, height : number, other : Entity[], imgSrc : string) {
    super(x, y, width, height);
    this._idleState = new IdleState();
    this._walkingState = new WalkingState();
    this._jumpingState = new JumpingState();
    this._fallingState = new FallingState();
    this._currState  = this._idleState;
    this._velocityX = 0;
    this._velocityY = 0;
    this._others = other
    this._sprite = new Image()
    this._framerate = 11;
    this._sprite.src = imgSrc
    this._frameBuffer = 4;
    this._frameElapsed = 0;
    this._sprite.onload= ()=>{
      this._loaded = true
      this._width = this._sprite.width / this._framerate
      this._height = this._sprite.height
    }

    this._currentFrame = 0
    this._loaded = false
  }
  update(manager: GameManager): void {

    if (manager.isKeyPressed("KeyA")) {
      this._velocityX = -5;
    } else if (manager.isKeyPressed("KeyD")) {
        this._velocityX = 5;  
    } else {
        this._velocityX = 0;
    }

  
    this._currState.update(this, manager)
  }



  render(ctx: CanvasRenderingContext2D): void {
    // console.log(this._y)
    // console.log(this._x)
    ctx.fillStyle = "blue"
    ctx.fillRect(this._x, this._y, this._width, this._height);

    
    if(this._loaded == false)return

    const cropbox ={
      position :{
        x : this._width * this._currentFrame,
        y:0
      },
      width : this._width,
      height : this._height
    }
    ctx.drawImage(this._sprite,
      cropbox.position.x,
      cropbox.position.y,
      cropbox.width,
      cropbox.height,
      this._x,
      this._y,
      this.width,
      this.height)

    this.updateFrames()
  }
  


  updateFrames(){
    this._frameElapsed++;
    if(this._frameElapsed % this._frameBuffer === 0){
      if(this._currentFrame < this._framerate-1){
        this._currentFrame++
      }else{
        this._currentFrame = 0;
  
      }
    }
  }

  public checkCollide(){
    for (let other of this.others) {
      if (this.collidesWith(other)) {
          
          return other;
      }
    }
    return null
  }

  
  public collideX(){
    let other = this.checkCollide()
    if(other){
      if(this.velocityX < -1){
        this.x = other.x + other.width + 0.25        
      }else if(this.velocityX > 1){
        
        this.x = other.x - this.width - 0.25
      }
    }
  }

  public collideY(){
    let other = this.checkCollide();
    if (other) {
        if (this.velocityY < 0) { 
          this.velocityY = 0
            this.y = other.y + other.height + 0.01;
        } else if (this.velocityY > 0) { 
          this.velocityY = 0
            this.y = other.y - this.height - 0.01;
        }
        this.velocityY = 0;
        this.setState(this.idleState)
    }
  }
  

  public get others() : Entity[]{
    return this._others
  }
  
  public get fallingState() : FallingState {
    return this._fallingState
  }
  

  public get velocityX(){
    return this._velocityX
  }

  public get velocityY(){
    return this._velocityY
  }

  public set velocityY(velocY : number){
    this._velocityY = velocY
  }

  public set velocityX(velocX :number){
    this._velocityX = velocX
  }

  public get idleState() : IdleState{
    return this._idleState
  }
  
  public get walkingState() : WalkingState{
    return this._walkingState
  }

  public get jumpingState(): JumpingState{
    return this._jumpingState
  }
  

  setState(newState : PlayerBaseState) {
    this._currState = newState;
    this._currState.enter(this);
  }
}
