import Enemy from '../sprites/Enemy';
import Bad from '../sprites/Bad';

import Item from '../sprites/Item';
import Heart from '../sprites/Heart';
import Coin from '../sprites/Coin';
import Fire from '../sprites/Fire';

export default class CreateEnemy  extends Phaser.Time.TimerEvent{
  constructor(config) {

    super(
      config.scene,
    );

    this._scene = config.scene;

    this.createObjTimerEvent = config.scene.time.addEvent({
      delay: 3000,
      callback: this.createObj,
      callbackScope: this,
      repeat: Infinity,
      startAt: 1000,
    });

    

    this.min_x = 2;
    this.max_x = 10;
    this.min_y = 2;
    this.max_y = 14;
    this.max_enemy_length = 8;
    this.interval = 16;
    this.appear_max_length = 3;

    this.objListEnemy = [
      [Enemy,"enemy"],
      [Bad,"bad"]
    ];
    this.objListItem = [
      [Heart,"heart"],
      [Coin,"coin"],
      [Fire,"fire"]
    ];
  }
  getRandomObjName(arr){
    let random = arr[Math.floor(Math.random() * arr.length)];
    return random;
  }

  createRandomPosition(){
    var randNumX = Math.floor(Math.random()*(this.max_x-this.min_x)+this.min_x);
    var randNumY = Math.floor(Math.random()*(this.max_y-this.min_y)+this.min_y);
    var randPos = [randNumX,randNumY];
    return randPos;  
  }
  searchUnset(x,y){

  }
  createObj(){

    let appear_length = Math.floor(Math.random()*(this.appear_max_length-1)+1);

    for(var i = 0;i<appear_length;i++){

      let itemName = this.getRandomObjName(this.objListItem);

      var randomPostion = this.createRandomPosition();

      let itemObject = new itemName[0]({
        scene: this._scene,
        key: itemName[1],
        x: randomPostion[0] * this.interval,
        y: randomPostion[1] * this.interval
      });
      itemObject.depth = 10;
      this._scene.itemGroup.add(itemObject);

    }

    if(this._scene.enemyGroup.getLength() >= this.max_enemy_length){
      return;
    }

    for(var i = 0;i<appear_length;i++){

      let enemyName = this.getRandomObjName(this.objListEnemy);

      var randomPostion = this.createRandomPosition();

      let enemyObject = new enemyName[0]({
        scene: this._scene,
        key: enemyName[1],
        x: randomPostion[0] * this.interval,
        y: randomPostion[1] * this.interval
      });
      enemyObject.depth = 10;
      this._scene.enemyGroup.add(enemyObject);

    }
  }
}
