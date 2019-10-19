import Enemy from './Enemy';

export default class EnemyChase extends Enemy {

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
    this.attackingPlayerTimerEvent;

    this.MONSTER_SPEED = 1;
    this.MONSTER_HIT_DELAY = 100;
    this.CHASING_DISTANCE = 60;
    this.ATTACKING_DISTANCE = 60;
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
    if (!this.chasingPlayerTimerEvent && this.shouldChase() ) {
      this.startChasing();
      return;
    }
    if (!this.attackingPlayerTimerEvent && this.shouldAttack()) {
      console.log("startAttacking")
      this.startAttacking();
    }
    if (this.chasingPlayerTimerEvent && this.shouldAttack()) {
      this.stopRunning();
    }
    if (this.attackingPlayerTimerEvent && !this.shouldAttack()) {
      this.stopAttacking();
    }

    if (this.chasingPlayerTimerEvent && !this.shouldChase()) {
      this.stopChasing();
      
    }

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
      delay: 1000,
      callback: this.moveTowardsPlayer,
      callbackScope: this,
      repeat: Infinity
    });
  }
  stopChasing() {
    if (this.active) {
      this.stopRunning();
    }
    this.chasingPlayerTimerEvent.remove(false);
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
  }
  shouldAttack() {
    const playerPoint = this.scene.player.getCenter();
    const monsterPoint = this.getCenter();
    const distance = monsterPoint.distance(playerPoint);

    if (distance < this.ATTACKING_DISTANCE) {
      return true;
    }

    return false;
  }
  startAttacking() {
    this.attackingPlayerTimerEvent = this.scene.time.addEvent({
      delay: 1000,
      callback: this.attack,
      callbackScope: this,
      repeat: Infinity
    });
  }
  stopAttacking() {
    if (!this.active) {
      return;
    }
    this.attackStop();
    if(this.attackingPlayerTimerEvent){
      this.attackingPlayerTimerEvent.remove(false);
      this.attackingPlayerTimerEvent = null;
    }

    // this.attackingPlayerTimerEvent.destroy();
    this.direction.x = 0;
    this.direction.y = 0;
  }

}