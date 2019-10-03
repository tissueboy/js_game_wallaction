import Enemy from './Enemy';

export default class Brain extends Enemy {

  constructor(config) {

    super(config);

    this.status = {
      hp: 10,
      power: 5,
      defense: 1,
      experience: 10,
      attackPoint: 2
    }

    this.chasingPlayerTimerEvent;
    this.shootingPlayerTimerEvent;

    this.MONSTER_SPEED = 1;
    this.MONSTER_HIT_DELAY = 100;
    this.CHASING_DISTANCE = 60;
    this.isStartled = false;

  }

  update(keys, time, delta) {
    if (!this.active) {
      return;
    }
    this.handleChase();
    this.hp.move(this.x,this.y);

  }
  handleChase() {
    if (!this.chasingPlayerTimerEvent && this.shouldChase()) {
      this.startChasing();
      this.startShooting();
      return;
    }

    if (this.chasingPlayerTimerEvent && !this.shouldChase()) {
      this.stopChasing();
      this.stopShooting();
    }

    // if (!this.shouldChase()) {
    //   // this.wanderAround();
    // }
  }
  shouldChase() {
    const playerPoint = this.scene.player.getCenter();
    const monsterPoint = this.getCenter();
    const distance = monsterPoint.distance(playerPoint);

    if (distance < this.CHASING_DISTANCE) {
      return true;
    }

    if (this.isStartled) {
      return true;
    }

    return false;
  }
  startChasing() {
    this.chasingPlayerTimerEvent = this.scene.time.addEvent({
      delay: 500,
      callback: this.moveTowardsPlayer,
      callbackScope: this,
      repeat: Infinity,
      startAt: 1000,
    });
  }
  stopChasing() {
    if (this.active) {
      this.stopRunning();
    }
    // this.chasingPlayerTimerEvent.destroy();
    this.chasingPlayerTimerEvent = null;
  }
  moveTowardsPlayer() {
    if (!this.active) {
      return;
    }

    const playerPoint = this.scene.player.getCenter();
    const monsterPoint = this.getCenter();
    var { x,y } = playerPoint.subtract(monsterPoint);

    var rangeRadius = 10;
    var radian = Math.atan2(x, y);
    x = rangeRadius * Math.sin(radian);
    y = rangeRadius * Math.cos(radian);

    this.direction.x = x;
    this.direction.y = y;

    this.run(x, y);

  }
  run(x, y) {

    if (x === 0 && y === 0) {
      return;
    }

    if (!this.active) {
      return;
    }

    this.setVelocityX(x * this.MONSTER_SPEED);
    this.setVelocityY(y * this.MONSTER_SPEED);

  }
  stopRunning() {
    if (!this.active) {
      return;
    }

    this.setVelocity(0);
    // this.beIdle();
  }
  startShooting() {
    this.shootingPlayerTimerEvent = this.scene.time.addEvent({
      delay: 1000,
      callback: this.bullet,
      callbackScope: this,
      repeat: Infinity,
      startAt: 1000,
    });
  }
  stopShooting() {
    if (!this.active) {
      return;
    }
    if (this.active) {
      this.stopRunning();
    }
    // this.shootingPlayerTimerEvent.destroy();
    this.shootingPlayerTimerEvent.remove(false);
    this.shootingPlayerTimerEvent = null;
    this.direction.x = 0;
    this.direction.y = 0;
  }

}