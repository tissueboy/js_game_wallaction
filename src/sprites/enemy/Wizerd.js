import EnemyChase from './EnemyChase';

export default class Wizerd extends EnemyChase {

  constructor(config) {

    super(config);

    this.status = {
      hp: 10,
      power: 5,
      defense: 1,
      experience: 10,
      attackPoint: 2
    }
    this.ATTACKING_DISTANCE = 30;
    this.sword = this.scene.add.sprite(this.x, this.y, 'sword');
    this.sword.depth = 11;
    config.scene.physics.world.enable(this.sword);
    config.scene.add.existing(this.sword);
    config.scene.physics.add.overlap(this.scene.player,this.sword,
      function(){
        // console.log("hit sword");
    });
    this.sword.setOrigin(0.5,0.5);
    this.sword.setVisible(false);
    this.sword.on(
      'animationcomplete',
      function(){
        this.isAttacking = false;
        this.sword.setVisible(false);
      },
      this
    );


    this.zone = this.scene.add.zone(this.x, this.y).setSize(this.width, this.height);
    this.zone.x = this.x;
    this.zone.y = this.y;
    config.scene.physics.world.enable(this.zone);
    this.zone.body.setAllowGravity(false);
    this.zone.body.moves = false;
    this.zone.depth = 110;
    this.zone.body.debugBodyColor = 0x00ffff;
    this.zone.setOrigin(0.5, 0.5);

    let _this = this;

    config.scene.physics.add.overlap(this.scene.player,this.zone,
      function(player,zone){
        if(!_this.active){
          return;
        }
        player.damage(_this.status.attackPoint);
        console.log("hit zone",);
      }
    );
    this.zone.setOrigin(0.5,0.5);

    this.attackingMoveTimerEvent;
    this.attackMoveTween = this.scene.tweens.createTimeline();
    this.isAttacking = false;

  }

  update(keys, time, delta) {
    if (!this.active) {
      return;
    }
    this.handleChase();
    this.hp.move(this.x,this.y);
    if(!this.isAttacking){
      this.zone.x = this.x - this.width/2;
      this.zone.y = this.y - this.height/2;  
    }
    this.sword.x = this.x;
    this.sword.y = this.y;
  }
  attack(){
    console.log("attack");
    if (!this.active) {
      return;
    }
    var radian = Math.atan2(this.direction.x, this.direction.y);


    let _target = this.sword;
    let _this = this;
    this.sword.setVisible(true);
    var degree = radian *  180 / Math.PI *-1;
    console.log("degree",degree);
    this.sword.angle = degree;
    if(this.isAttacking){
      return;
    }
    this.isAttacking = true;
    this.attackHitEvent = this.scene.time.addEvent({
      delay: 300,
      callback: function(){
        this.zone.x = this.zone.x + this.zone.width*Math.sin(radian);
        this.zone.y = this.zone.y + this.zone.height*Math.cos(radian);
      },
      callbackScope: this,
      repeat: 0,
    });
    this.sword.anims.play('swordAnimeL', true);
  }
  attackStop(){
    console.log("attackStop");
    this.sword.anims.resume();
  }
}