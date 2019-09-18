import Bullet from '../sprites/Bullet';
import Sword from '../sprites/Sword';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {

    super(config.scene, config.x, config.y, config.key,config.hp);

    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    /*==============================
    パラメータ
    ==============================*/
    this.player_shot_line = this.scene.add.graphics({ lineStyle: { width: 1, color: 0xFFFFFF } });
    this.player_shot_line.lineStyle(2, 0xFFFFFF);
    this.shotVelocity = new Phaser.Math.Vector2();
    this.countTouch = 0;

    this.arrow = this.scene.add.sprite(this.x, this.y + 20, 'arrow');
    this.arrow.depth = 100;
    config.scene.physics.world.enable(this.arrow);
    config.scene.add.existing(this.arrow);
    this.arrow.setVisible(false);

    this.setWeapon = "bullet";

    this.isDamege = false;

    this.active_time = {
      speed: 1
    }
    this.status = {
      hp: 10,
      power: 2,
      defense: 1
    }
    this.damage_text = 0;

    this.damageText = this.scene.add.text(this.x, this.y, this.damage_text, {
      fontFamily: 'monospace',
      fontSize: 10,
      fontStyle: 'bold',
      color: '#FF0000',
      align: 'center',
      style:{
      }
    });

    this.damageText.setVisible(false);

    this.damageText.depth = 14;

    this.attach;



  }

  update(keys, time, delta) {
 

    /*==============================
    プレイヤーの移動
    ==============================*/
    this.setVelocityX(keys.DIRECTION.x*4);
    this.setVelocityY(keys.DIRECTION.y*4);

    this.arrow.x = keys.DIRECTION2.x + this.x;
    this.arrow.y = keys.DIRECTION2.y + this.y;

    this.arrow.angle = keys.RADIAN2 * ( -180 / Math.PI ) ;   


    /*==============================
    発射の方向表示
    ==============================*/
    if(keys.isTOUCH2 === true){
      this.arrow.setVisible(true);
    }else{
      this.arrow.setVisible(false);        
    }

    /*==============================
    発射
    ==============================*/
    if(keys.isRELEASE2 === true && this.countTouch === 0){
      this.countTouch++;
      this.shotVelocity = keys.VECTOR2;
      if(this.attach){
        this.attach.throwItem({
          x: this.x,
          y: this.y,
          vx: this.shotVelocity.x,
          vy: this.shotVelocity.y,          
        });
      }
      if(this.setWeapon === "bullet" && !this.attach && this.scene.active_time.active){
        this.bullet();
      }

      
      this.arrow.setVisible(false);    

    }else{
      keys.isRELEASE2 = false;
      this.countTouch = 0;
    }

  }
  bullet(){
    var bullet = new Bullet({
      scene: this.scene,
      x: this.x,
      y: this.y,
      vx: this.shotVelocity.x,
      vy: this.shotVelocity.y,
      target: this,
      power: this.scene.active_time.store_power*0.1
    });
    // bullet.loadTexture('bullet');
    this.scene.bulletGroup.add(bullet);   
    this.scene.active_time.bar = 0;
    this.countTouch++; 
  }
  sword(){
    var sword = new Sword({
      scene: this.scene,
      key: 'sword',
      x: this.x,
      y: this.y,
      vx: this.shotVelocity.x,
      vy: this.shotVelocity.y,
      target: this
    });
    this.scene.swordGroup.add(sword);   
    this.countTouch++; 
  }
  
  damage(num){
    
    if(this.isDamege === true){
      return;
    }

    let damage = num - this.status.defense;
    if(damage <= 0){
      damage = 1;
    }
    this.scene.hp.calc(damage*-1,this);

    this.damageText.text = damage;
    this.damageText.x = this.x - this.body.halfWidth;
    this.damageText.y = this.y - this.height * 1.0;
    this.damageText.setVisible(true);

    var _damageText = this.damageText;
    var _damageText_x = this.damageText.x - this.halfWidth;
    var _damageText_y = this.damageText.y - this.height * 0.1;

    var damageTween = this.scene.tweens.add({
        targets: _damageText,
        y: _damageText_y,
        ease: 'liner',
        duration: 200,
        repeat: 0,
        onComplete: function () {
          _damageText.setVisible(false);
        },
    });

    
    this.isDamege = true;

    var player = this;
    var playerDamageTween = this.scene.tweens.add({
      targets: this,
      alpha: 0.2,
      duration: 200,
      loop: 5,
    });
    var stop = function(){
      playerDamageTween.stop();
      player.alpha = 1;
      player.isDamege = false;
    }
    setTimeout(stop, 1000);

  }
}
