import Item from './Item';
import FireArea from './FireArea';

export default class Fire extends Item {
  constructor(config) {
    super(config);
    // this.recoveryPoint = 1;
    this.scene = config.scene;
    this.attached = false;
    this.throwed = false;
    this.speed = 10;
    this.hitCount = 0;
    this.count = 0;
    this.attackPoint = 10;

    this.areaTimer;

    this.attack_once = false;

    /*==============================
    デバッグ
    ==============================*/
    this.debugText = this.scene.add.text(20, 20, '', { font: '8px Courier', fill: '#ff0000' });
    this.debugText.depth = 100;
    this.debugText.setScrollFactor(0,0);

  }

  update(){
    if(this.attached === true){

      this.x = this.scene.player.x;
      this.y = this.scene.player.y;
      this.depth = 20;

    }
  }
  hit(){
    // this.scene.hp.calc(this.recoveryPoint);
    // this.destroy();
    if(this.hitCount > 0){
      return;
    }
    this.hitCount++;
    if(this.attached === true){
      return;
    }else{
      this.attached = true;      
    }
    if(!this.scene.player.attach){
      this.scene.player.attach = this;
    }
  }
  throwItem(param){
    this.throwed = true;
    this.body.setVelocity(param.vx*this.speed,param.vy*this.speed);
  }
  checkCollision(item,obj){

    if(this.attack_once){
      return;
    }

    if(this.throwed === true){
      if(obj === this.scene.groundLayer){
        // console.log("checkCollision groundLayer");
      } 
      if(obj.type === "enemy"){
        console.log("checkCollision enemyGroup");
        // let circle = new Phaser.Geom.Circle(obj.x, obj.y, 30);//x,y.size
        // let area = this.scene.add.graphics({ fillStyle: { color: 0xFFFFFF } });
        // area.fillCircleShape(circle);
        // area.depth = 10;
        // area.alpha = 0.5;
        let radius = 46;

        this.scene.enemyGroup.children.entries.forEach(
          (sprite) => {
            if(radius*radius >= (sprite.x - obj.x)*(sprite.x - obj.x) + (sprite.y - obj.y)*(sprite.y - obj.y)){
              if(sprite.active){
                sprite.damage(item.attackPoint);
                // this.scene.combo.hit();
              }
            }
          }
        );
        // this.visible = false;
        let area = new FireArea({
          scene: this.scene,
          x: obj.x,
          y: obj.y,
          key: 'fire_area'
        });
        area.depth = 2;
        this.scene.spellGroup.add(area);


        let areaTimer2 = this.scene.time.delayedCall(
          1000,
          function(){
            console.log("callbacks");
            // area.clear();
            this.scene.spellGroup.children.entries.forEach(
              (sprite) => {
                sprite.destroy();
            });
          },
          [],
          this
        ); 

      }
      this.attached = false;
      this.throwed = false;
      this.attack_once = true;
      this.visible = false;

    }else{
      return;
    }
  }
  area_x_enemy_Collision(area,enemy){
    enemy.alpha = 0.4;
    // fire.count++;
    // console.log("enemy",enemy);
    // enemy.damage(area.attackPoint);
    // scene.debugText.text = String(scene.count);
  }
  callbacks(timer,area){
    console.log("callbacks");
    this.scene.combo.combo_count = 0;
    // area.clear();
    this.scene.spellGroup.children.entries.forEach(
      (sprite) => {

        sprite.destroy();
    });
    // timer.destroy();
    // timer = null;
    // fire.scene.enemyGroup.children.entries.forEach(
    //   (sprite) => {
    //     console.log(sprite);
    //   }
    // );
    // fire.areaTimer.remove(false);
  }
}