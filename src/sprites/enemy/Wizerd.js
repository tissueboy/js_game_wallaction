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
    this.sword = this.scene.add.sprite(this.x, this.y, 'sword');
    this.sword.depth = 11;
    config.scene.physics.world.enable(this.sword);
    config.scene.add.existing(this.sword);
    config.scene.physics.add.overlap(this.scene.player,this.sword,
      function(){
        console.log("hit sword");
    });
    this.sword.setOrigin(0.5,1.2);
    this.sword.setVisible(false);
    // let _sword = this.sword;
    // this.axeTween = this.scene.tweens.add({
    //   targets: this.sword,
    //   angle: 360,
    //   repeat: 0,
    //   duration: 800,
    //   onComplete: function () {
    //     _sword.setVisible(false);
    //   },
    // });
    // this.rect = new Phaser.Geom.Rectangle(0, 0, 20, 20);
    // this.hitBox = this.scene.add.zone({ fillStyle: { color: 0x0000ff } });
    // this.hitBox.fillRectShape(this.rect);
    // this.hitBox.depth = 120;
    // this.hitBox.x = this.x;
    // this.hitBox.y = this.y;
    // this.hitBox.alpha = 0.4;
    // console.log("this.hitBox",this.hitBox);
    // this.hitBox.displayOriginX = 0.5;
    // this.hitBox.displayOriginY = 0.5;

    this.zone = this.scene.add.zone(20, 20).setSize(20, 20);
    // this.zone = this.scene.add.zone(10, 10).setSize(200, 200);
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
        console.log("hit hitBox");
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
    if (!this.active) {
      return;
    }
    var radian = Math.atan2(this.direction.x, this.direction.y);
    var degree = radian * ( 180 / Math.PI ) ;
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
    console.log("degree",degree);
    console.log("this.direction.x",this.direction.x);
    console.log("this.direction.y",this.direction.y);
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
    this.attackMoveTween = this.scene.tweens.timeline({
      targets: _target,
      tweens: [{
        angle: degree - 90
      },
      {
        angle: degree + 90
      }
      ],
      ease: 'liner',
      duration: 600,
      repeat: 0,
      completeDelay: 400,
      onComplete: function () {
        _target.setVisible(false);
        _this.isAttacking = false;
        _this.attackMoveTween.stop;
      }
    }); 
  }
}