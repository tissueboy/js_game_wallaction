export default class Hp {
  constructor(config) {

    this.hp = 10;
    this.hpMax = 10;

    this.hp_bar = config.scene.add.sprite(0, 0, 'hp_bar');
    this.hp_bar.setScrollFactor(0,0);
    this.hp_bar.displayWidth = config.scene.game.config.width;
    this.hp_bar.displayWidthMax = config.scene.game.config.width;
    this.hp_bar.displayOriginX = 0;
    this.hp_bar.displayOriginY = 0;
    this.hp_bar.depth = 104;
    this.hp_bar_bg = config.scene.add.sprite(0, 0, 'hp_bar');
    this.hp_bar_bg.displayWidth = config.scene.game.config.width;
    this.hp_bar_bg.displayWidthMax = config.scene.game.config.width;
    this.hp_bar_bg.displayOriginX = 0;
    this.hp_bar_bg.displayOriginY = 0;
    this.hp_bar_bg.alpha = 0.4;    
    this.hp_bar_bg.setScrollFactor(0,0);
    this.hp_bar_bg.depth = 104;

  }
  calc(num,obj){

    this.hp = this.hp + num;

    if(this.hp >= this.hpMax){
      this.hp = this.hpMax;
    }
    this.hp_bar.displayWidth = this.hp_bar.displayWidthMax * (this.hp / this.hpMax);
    if(this.hp <= 0){
      // obj.explode();
      // this.explode();
    }
  }
}
