export default class ActiveTime extends Phaser.Physics.Arcade.Sprite{
  constructor(config) {

    super(config.scene, config.x, config.y, config.key);

    this.bar = 0;
    this.barMax = 10;


    this.active_bar = config.scene.add.sprite(0, 10, 'active_bar');
    this.active_bar.setScrollFactor(0,0);
    this.active_bar.displayWidth = 0;
    this.active_bar.displayWidthMax = config.scene.game.config.width / 2;
    this.active_bar.displayOriginX = 0;
    this.active_bar.displayOriginY = 0;
    this.active_bar.depth = 104;
    this.active_bar_base = config.scene.add.sprite(0, 10, 'active_bar');
    this.active_bar_base.displayWidth = 0;
    this.active_bar_base.displayWidthMax = config.scene.game.config.width / 2;
    this.active_bar_base.displayOriginX = 0;
    this.active_bar_base.displayOriginY = 0;
    this.active_bar_base.alpha = 0.4;    
    this.active_bar_base.setScrollFactor(0,0);
    this.active_bar_base.depth = 104;

    this.speed = config.scene.player.active_time.speed * 0.1;
    this.per = 0;

    // this.activeTimerEvent;

    console.log(config);

  }
  update(keys, time, delta) {
    if(this.bar >= this.barMax){
      this.bar = this.barMax;
    }else{
      this.bar = this.bar + this.speed;
    }
    this.active_bar.displayWidth = this.active_bar.displayWidthMax * (this.bar / this.barMax);        
    this.per = this.bar / this.barMax;
  }

}
