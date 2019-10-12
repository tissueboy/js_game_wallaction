import Enemy from './Enemy';

export default class Bad extends Enemy {

  constructor(config) {

    super(config);

    this.status = {
      hp: 2,
      power: 5,
      defense: 2,
      experience: 10,
      attackPoint: 1,
      walkSpeed: 12
    }
    this.maxDistanceRadius = 30;
    this.maxDistanceArea = {
      top   : this.y - this.maxDistanceRadius,
      left  : this.x - this.maxDistanceRadius,
      right : this.x + this.maxDistanceRadius,
      bottom: this.y + this.maxDistanceRadius
    }
    this.counterDistance = 0;

    this.firstDirectionArr = [
      [-1,0],//左
      [0,1],//上
      [1,0],//右
      [0,-1]//下
    ];
    this.body.setGravity(0,0);
    this.getDirection = this.getRandomObjName(this.firstDirectionArr);
    this.moveDirection = {
      x : this.getDirection[0],
      y : this.getDirection[1]
    }
    this.anims.play('badAnime', true);
  }
  update(){


    if (this.active) {
      this.hp.move(this.x,this.y);
      this.checkDistance(this.moveDirection);
    }
    if(this.explodeAnime){
      this.explodeAnime.update(time, delta);
    }
  }
  getRandomObjName(arr){
    let random = arr[Math.floor(Math.random() * arr.length)];
    return random;
  }
  appearEnemyAfter(){
    // this.body.setVelocity(
    //   this.firstDirection[0]*this.status.walkSpeed,
    //   this.firstDirection[1]*this.status.walkSpeed
    // );
    // this.checkDistance(this.firstDirection);

    
  }
  checkDistance(addDistance){

    if(this.body.blocked.up){
      this.moveDirection.y = 1;
    }
    if(this.body.blocked.down){
      this.moveDirection.y = -1;
    }
    if(this.body.blocked.left){
      this.moveDirection.x = 1;
    }
    if(this.body.blocked.right){
      this.moveDirection.x = -1;
    }

    if(this.y <= this.maxDistanceArea.top ){
      this.moveDirection.y = 1;
    }
    if(this.y >= this.maxDistanceArea.bottom ){
      this.moveDirection.y = -1;
    }
    if(this.x <= this.maxDistanceArea.left ){
      this.moveDirection.x = 1;
    }
    if(this.x >= this.maxDistanceArea.right ){
      this.moveDirection.x = -1;
    }

    this.body.setVelocity(
      this.moveDirection.x*this.status.walkSpeed,
      this.moveDirection.y*this.status.walkSpeed
    );

    // this.counterDistance += this.status.walkSpeed;
  }

}