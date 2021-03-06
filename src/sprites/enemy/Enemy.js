import EnemyHp from './EnemyHp';
import Explode from '../Explode';

import Item from '../item/Item';
import Heart from '../item/Heart';
import Coin from '../item/Coin';

export default class Enemy extends Phaser.Physics.Arcade.Sprite {

  constructor(config) {

    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    this.setImmovable(true);/*ぶつかっても影響を受けない*/

    this.isDamege = false;

    this.type = "enemy";

    this._scene = config.scene;

    this.status = {
      hp: 10,
      power: 5,
      defense: 1,
      experience: 10,
      attackPoint: 2
    }
    this.hp;

    this.invincible = false;

    this.explodeSprite;

    this.damage_text = 0;


    this.damageText = this.scene.add.bitmapText(
      this.x,
      this.y,
      'bitmapFont',
      this.damage_text,
      30
    );

    this.damageText.setVisible(false);
    this.damageText.depth = 14;

    this.direction = {
      x: 0,
      y: 0
    }

    /*==============================
    表示までOFF
    ==============================*/
    this.active = false;
    this.damageText.visible = false;
    this.visible = false;
    this.delayActiveTimerEvent;

    /*==============================
    表示までのアニメーション
    ==============================*/
    this.circle = new Phaser.Geom.Circle(this.x, this.y, 10);//x,y.size
    this.appearCircle = this.scene.add.graphics({ fillStyle: { color: 0xFF0000 } });
    this.appearCircle.fillCircleShape(this.circle);
    this.appearCircle.depth = 1;
    this.delayActiveTimerEvent = this.scene.time.addEvent({
      delay: 2000,
      callback: this.appearEnemy,
      callbackScope: this
    });

    this.dropItemList = [
      [Coin, "coin"],
      [Heart, "heart"]
    ]
  }

  update(keys, time, delta) {
    // if (!this.active) {
    //   return;
    // }
    if (this.active) {
      this.hp.move(this.x,this.y);
    }
    if(this.explodeAnime){
      this.explodeAnime.update(time, delta);
    }

  }
  damage(num){

    if(this.invincible){
      return;
    }

    this.scene.combo.hit();  

    let damage = num - this.status.defense;
    if(damage <= 0){
      damage = 1;
    }


    if(this.hp.active){
      this.hp.calc(damage*-1,this);
    }

    this.damageText.text = damage;
    this.damageText.x = this.x - this.body.halfWidth;
    this.damageText.y = this.y - this.height * 1.8;
    this.damageText.setVisible(true);

    var _damageText = this.damageText;
    var _damageText_x = this.damageText.x;
    var _damageText_y = this.y - this.height * 1.4;

    var damageTween = this.scene.tweens.add({
        targets: _damageText,
        y: _damageText_y,
        ease: 'liner',
        duration: 100,
        repeat: 0,
        completeDelay: 400,
        onComplete: function () {
          _damageText.setVisible(false);
        },
    });

    this.isDamege = true;

    var enemy = this;
    var enemyDamageTween = this.scene.tweens.add({
      targets: this,
      alpha: 0.2,
      duration: 200,
      loop: 10,
    });
    var stop = function(){
      enemyDamageTween.stop();
      enemy.alpha = 1;
      enemy.isDamege = false;
    }
    setTimeout(stop, 600);

    if (!this.hp.active) {
      this.hp.explode();
    }

    if (!this.active) {
      this.visible = false;
      this.explodeSprite = new Explode({
        scene: this.scene,
        key: "explosionAnime_m",
        x: this.x,
        y: this.y,
        target: this 
      });
      // this.explodeSprite.explode();
    }
  }
  getExperience(){
    this.scene.experience = this.scene.experience + this.status.experience;
  }
  explode(){

    let type = this.type;

    if(type === "boss"){
      this.scene.clearStageDisplay();
    }  
    this.active = false;  
    this.explodeSprite.destroy();
    this.getExperience();
    this.dropItem();
    this.destroy();
    
    // this.destroy();
  }
  appearEnemy(){
    this.active = true;
    this.visible = true; 
    this.delayActiveTimerEvent.remove(false);
    this.delayActiveTimerEvent = null;
    this.hp = new EnemyHp({
      scene: this._scene,
      key: 'hp',
      target: this,
      hp: this.status.hp
    });
    this.hp.active = true;
    this.appearCircle.destroy();
    this.appearEnemyAfter();
  }
  appearEnemyAfter(){

  }
  getRandomObjName(arr){
    let random = arr[Math.floor(Math.random() * arr.length)];
    return random;
  }
  dropItem(){

    let itemName = this.getRandomObjName(this.dropItemList);

    let itemObject = new itemName[0]({
      scene: this._scene,
      key: itemName[1],
      x: this.x,
      y: this.y,
      mode: "dropEnemyItem"
    });
    itemObject.depth = 10;
    this._scene.itemGroup.add(itemObject);

  }
  fireCollision(){
  }
}