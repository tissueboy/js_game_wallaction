import Item from '../sprites/Item';

export default class Fire extends Item {
  constructor(config) {
    super(config);
    // this.recoveryPoint = 1;
    this.attached = false;
    this.speed = 10;
    this.hitCount = 0;
  }

  update(){
    if(this.attached === true){

      this.x = this.scene.player.x;
      this.y = this.scene.player.y;
      this.depth = 20;

    }
  }
  hit(){
    // this.scene.hp.calc(this.recoveryPoint);
    // this.destroy();
    if(this.hitCount > 0){
      return;
    }
    this.attached = true;
    this.hitCount++;
    if(!this.scene.player.attach){
      this.scene.player.attach = this;
    }
  }
  throwItem(param){
    this.attached = false;
    this.body.setVelocity(param.vx*this.speed,param.vy*this.speed);
  }
  checkCollision(obj){
    if(obj === this.scene.groundLayer){
      console.log("checkCollision groundLayer");
    } 
    if(obj === this.scene.enemyGroup){
      console.log("checkCollision enemyGroup");
    } 
    this.destroy();
  }
}