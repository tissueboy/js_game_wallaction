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
    this.ATTACKING_DISTANCE = 20;
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
        console.log("animationcomplete");
        this.isAttacking = false;
        this.sword.setVisible(false);
        // this.sword.anims.stop();
      },
      this
    );


    this.zone = this.scene.add.zone(20, 20).setSize(20, 20);
    this.zone.x = this.x;
    this.zone.y = this.y;
    config.scene.physics.world.enable(this.zone);
    this.zone.body.setAllowGravity(false);
    this.zone.body.moves = false;
    this.zone.depth = 110;
    this.zone.body.debugBodyColor = 0x00ffff;
    this.zone.setOrigin(0.5, 0.5);

    config.scene.physics.add.overlap(this.scene.player,this.zone,
      function(){

    });
    this.zone.setOrigin(0.5,1.2);

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
    this.sword.x = this.x;
    this.sword.y = this.y;
    /*
    TODO
    swordを回転させる。
    回転に合わせてhitbox用のgeomを作成して当たり判定する。
    */
  }
  attack(){
    console.log("attack");
    if (!this.active) {
      return;
    }
    var radian = Math.atan2(this.direction.x, this.direction.y);
    var degree = radian * 360/(2*Math.PI);
    // var rangeRadius = 10;
    // var direction_x = rangeRadius * Math.sin(radian);
    // var direction_y = rangeRadius * Math.cos(radian);

    let _target = this.sword;
    let _this = this;
    this.sword.setVisible(true);
    if(this.isAttacking){
      return;
    }
    this.isAttacking = true;
    this.attackHitEvent = this.scene.time.addEvent({
      delay: 300,
      callback: function(){
        this.zone.x = this.x + this.direction.x;
        this.zone.y = this.y + this.direction.y;
      },
      callbackScope: this,
      repeat: 0,
      // startAt: 1000,
    });
    this.sword.anims.play('swordAnime', true);

    // let degree_start = 0;
    // let degree_base = 0;
    // if(degree > 0){
    //   degree_base = 180 - degree;
    // }else{
    //   degree_base = (-180 - degree) * -1;
    // }

    // this.attackMoveTween = this.scene.tweens.timeline({
    //   targets: _target,
    //   tweens: [{
    //     angle: degree_base - 90
    //   },
    //   {
    //     angle: degree_base + 90
    //   }
    //   ],
    //   ease: 'liner',
    //   duration: 600,
    //   repeat: 0,
    //   completeDelay: 400,
    //   onComplete: function () {
    //     _target.setVisible(false);
    //     _this.isAttacking = false;
    //     _this.attackMoveTween.stop;
    //   }
    // }); 
  }
  attackStop(){
    console.log("attackStop");
    this.sword.anims.resume();
  }
}