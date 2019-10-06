import Enemy from './Enemy';

export default class Boss1 extends Enemy {

  constructor(config) {

    super(config);

    this.status = {
      hp: 20,
      power: 5,
      defense: 6,
      experience: 10,
      attackPoint: 1
    }

  }

}