
export default class Bullet extends Phaser.GameObjects.Sprite {
  constructor(config) {

    super(
      config.scene,
      config.x,
      config.y,
      config.key,
      config.frame,
      config.vx,
      config.vy,
      config.target,
      config.power,
      config.scale,
      config.type
    );

    this.type = config.type;
    this._scene = config.scene;

    // this.texture.
    this.setTexture("bullet");

    // this.scene.anims.create({
    //   key: 'bulletAnime',
    //   frames: this.scene.anims.generateFrameNumbers('bullet_anime', { start: 0, end: 0 }),
    //   frameRate: 10,
    //   repeat: -1
    // });
    // this.anims.play('bullet');
    

    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);
    // this.body.collideWorldBounds = true;
    // this.body.bounceX = 1;
    // this.body.bounceY = 1;
    // this.body.setCollideWorldBounds(true);

    this.target = config.target;
    
    this.attackPoint = Math.floor(1 * this.target.status.power + (this.target.status.power * config.power));

    this.speed = 10;
    this.depth = 10;

    this.vx = config.vx;
    this.vy = config.vy;
    
    this.body.setGravity(0,0);
    this.body.setVelocity(this.vx*this.speed,this.vy*this.speed);   

    this.breakTime = 1600;

    this.breakTimerEvent;

    // this.scaleX = 0.6;
    // this.scaleY = 0.6;

    this.scaleX = this.scaleX * config.scale;
    this.scaleY = this.scaleY * config.scale;
    


    /*==============================
    デバッグ
    ==============================*/
    this.text = this.scene.add.text(10, 10, 'Use up to 4 fingers at once', { font: '8px Courier', fill: '#ff0000' });
    this.text.depth = 100;
    this.text.setScrollFactor(0,0);

  }

  update(time, delta) {

    this.breakTime -= delta;
    if(this.breakTime < 0){
      this.explode();
    }

    if(this.y > 1000 || this.y < 0 || this.x < 0 || this.x > 1000){
      this.destroy();
    }
  }

  collided(bullet,layer) {

  }

  explode() {
    console.log("this.type exp",this.type);
    if(this.type === "player"){
      this._scene.combo_count = 0;
      this._scene.comboText.text = "x "+this._scene.combo_count;
    }
    this.scene.bulletGroup.remove(this);
    this.scene.bulletEnemyGroup.remove(this);
    this.destroy();
  }
  bounce(){

    if(this.body.blocked.up || this.body.blocked.down){
      this.vy = this.vy * -1;
    }
    if(this.body.blocked.left || this.body.blocked.right){
      this.vx = this.vx * -1;
    }

    this.body.setVelocity(this.vx*this.speed,this.vy*this.speed);
  }
}
