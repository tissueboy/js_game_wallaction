import Enemy from '../sprites/Enemy';
import Bad from '../sprites/Bad';

export default class CreateEnemy  extends Phaser.Time.TimerEvent{
  constructor(config) {

    super(
      config.scene,
    );

    this._scene = config.scene;

    this.createEnemyTimerEvent = config.scene.time.addEvent({
      delay: 3000,
      callback: this.createEnemy,
      callbackScope: this,
      repeat: Infinity,
      startAt: 1000,
    });
    this.min_x = 2;
    this.max_x = 12;
    this.min_y = 2;
    this.max_y = 14;
    this.max_enemy_length = 8;
    this.interval = 16;
    this.appear_max_length = 3;

  }
  createRandomPosition(){
    var randNumX = Math.floor(Math.random()*(this.max_x-this.min_x)+this.min_x);
    var randNumY = Math.floor(Math.random()*(this.max_y-this.min_y)+this.min_y);
    var randPos = [randNumX,randNumY];
    return randPos;  
  }
  searchUnset(x,y){

  }
  createEnemy(){

    if(this._scene.enemyGroup.getLength() >= this.max_enemy_length){
      return;
    }

    let appear_length = Math.floor(Math.random()*(this.appear_max_length-1)+1);

    console.log("appear_length",appear_length);

    for(var i = 0;i<appear_length;i++){

      var randomPostion = this.createRandomPosition();

      let enemyObject = new Bad({
        scene: this._scene,
        key: 'bad',
        x: randomPostion[0] * this.interval,
        y: randomPostion[1] * this.interval
      });
      enemyObject.depth = 10;
      this._scene.enemyGroup.add(enemyObject);

    }
  }
}
