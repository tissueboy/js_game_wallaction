export default class Item extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key);
    config.scene.physics.world.enable(this);
    config.scene.add.existing(this);

    /*==============================
    表示までOFF
    ==============================*/
    this.active = false;
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
      callback: this.appearObj,
      callbackScope: this
    });

  }
  checkCollision(){
    //collider用
    //@todo エフェクトとか作る
    return;    
  }
  appearObj(){
    this.active = true;
    this.visible = true; 
    this.delayActiveTimerEvent.remove(false);
    this.delayActiveTimerEvent = null;
    this.appearCircle.destroy();
  }
}