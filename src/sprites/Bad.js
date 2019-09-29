import Enemy from '../sprites/Enemy';

export default class Bad extends Enemy {

  constructor(config) {

    super(config);

    this.status = {
      hp: 2,
      power: 5,
      defense: 2,
      experience: 10,
      attackPoint: 1
    }

  }

}