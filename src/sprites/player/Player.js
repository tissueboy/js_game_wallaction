import Bullet from '../weapon/Bullet';
import Sword from '../weapon/Sword';
import Axe from '../weapon/Axe';
import Calcs from '../../helper/Calcs';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(config) {

    super(
      config.scene,
      config.x,
      config.y,
      config.key,
      config.frame,
      config.hp
    );

    console.log("this",this);

    // this.anims.play('playerIdleAnime', true);

    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    /*==============================
    ヘルパー関数群を呼び出し
    ==============================*/    
    this.calcs = new Calcs();

    /*==============================
    パラメータ
    ==============================*/
    this.player_shot_line = this.scene.add.graphics({ lineStyle: { width: 1, color: 0xFFFFFF } });
    this.player_shot_line.lineStyle(2, 0xFFFFFF);
    this.shotVelocity = new Phaser.Math.Vector2();
    this.countTouch = 0;

    this.playerShotLineLength = 40;

    this.scope = this.scene.add.sprite(this.x, this.y + this.playerShotLineLength, 'scope');
    this.scope.depth = 100;
    config.scene.physics.world.enable(this.scope);
    config.scene.add.existing(this.scope);
    this.scope.setVisible(false);
    this.scope.vector = {
      x: 1,
      y: 1
    }
    this.scope.x = this.x + this.playerShotLineLength*this.scope.vector.x;
    this.scope.y = this.y + this.playerShotLineLength*this.scope.vector.y;

    this.playerShotLine = this.scene.add.graphics({ lineStyle: { width: 1, color: 0xFFFFFF } });
    this.playerShotLine.lineStyle(2, 0xFFFFFF);
    this.playerShotLine.depth = 10;

    this.line_x = 0;
    this.line_y = 0;

    this.weapon;

    this.isDamege = false;

    this.active_time = {
      speed: 2
    }
    this.status = {
      hp: 10,
      power: 20,
      defense: 1
    }
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

    this.attach;

    this.attacked = false;

    this.starTimerEvent;
  }

  update(keys, time, delta) {
 

    /*==============================
    プレイヤーの移動
    ==============================*/
    this.setVelocityX(keys.DIRECTION.x*4);
    this.setVelocityY(keys.DIRECTION.y*4);

    if(keys.DIRECTION2.x !== 0 && keys.DIRECTION2.y !== 0){
      this.scope.vector = this.calcs.returnMax1(keys.DIRECTION2.x,keys.DIRECTION2.y);

      this.scope.x = this.x + this.playerShotLineLength*this.scope.vector.x;
      this.scope.y = this.y + this.playerShotLineLength*this.scope.vector.y;

    }


    // this.scope.angle = keys.RADIAN2 * ( -180 / Math.PI ) ;   

    /*==============================
    発射の方向表示
    ==============================*/

    if(keys.isTOUCH2 === true){
      this.scope.setVisible(true);
      this.playerShotLine.clear();
      this.scope.vector = this.calcs.returnMax1(keys.VECTOR2.x,keys.VECTOR2.y);
      this.playerShotLine.lineBetween(
        this.x,
        this.y,
        this.x+this.playerShotLineLength*this.scope.vector.x,
        this.y+this.playerShotLineLength*this.scope.vector.y
      );
    }else{
      this.scope.setVisible(false);        
      this.playerShotLine.clear();
    }

    /*==============================
    発射
    ==============================*/
    if(keys.isRELEASE2 === true && this.countTouch === 0){
      this.countTouch++;
      this.shotVelocity = keys.VECTOR2;
      if(!this.attach && this.scene.active_time.active){
        this.bullet();
      }
      
      if(this.attached){
        this.attached = false;
        this.attach.throwItem({
          x: this.x,
          y: this.y,
          vx: this.shotVelocity.x,
          vy: this.shotVelocity.y,          
        });
        this.attach = "";
      }


      
      // this.scope.setVisible(false);    

    }else{
      keys.isRELEASE2 = false;
      this.countTouch = 0;
    }

  }
  bullet(){
    let bullet;
    if(this.weapon === "bullet"){
      bullet = new Bullet({
        scene: this.scene,
        x: this.x,
        y: this.y,
        key: "bullet",
        vx: this.shotVelocity.x,
        vy: this.shotVelocity.y,
        target: this,
        power: this.status.power ,
        scale: 1,
        //ための場合
        // power: this.status.power + this.status.power*this.scene.active_time.per,
        // scale: 1 + this.status.power*this.scene.active_time.per,
        type: "player"
      });      
    }
    if(this.weapon === "axe"){
      bullet = new Axe({
        scene: this.scene,        
        x: this.x,
        y: this.y,
        key: "axe",
        vx: this.shotVelocity.x,
        vy: this.shotVelocity.y,
        target: this,
        power: this.status.power ,
        scale: 1,
        //ための場合
        // power: this.status.power + this.status.power*this.scene.active_time.per,
        // scale: 1 + this.status.power*this.scene.active_time.per,
        type: "player"
      });      
    }
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

    if(this.invincible){
      return;
    }
    
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
  starMode(){
    let _this = this;
    this.anims.play('playerStarAnime', true);
    this.invincible = true;
    this.starTimerEvent = this.scene.time.delayedCall(
      // delay: 0,
      2000,
      function(){
        _this.invincible = false;
        _this.anims.play('playerIdleAnime', true);
      },
      [],
      this);
  }
}
