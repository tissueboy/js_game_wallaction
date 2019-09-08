export default class Bullet extends Phaser.GameObjects.Sprite {
    constructor(config) {

      super(config.scene,config.x,config.y,config.key,config.vx,config.vy,config.target);
      
      this.type = "bullet";

      config.scene.physics.world.enable(this);
      config.scene.add.existing(this);

      this.target = config.target;
      
      this.attackPoint = 1 * this.target.status.power;

      this.speed = 10;
      this.depth = 10;
      
      this.body.setGravity(0,0);
      this.body.setVelocity(config.vx*this.speed,config.vy*this.speed);   

    }

    update(time, delta) {
      if(this.y > 1000 || this.y < 0 || this.x < 0 || this.x > 1000){
        this.destroy();
      }
    }

    collided() {

    }

    explode() {
      this.destroy();
    }
}
