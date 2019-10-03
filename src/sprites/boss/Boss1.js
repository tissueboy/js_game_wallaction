import Boss from './Boss';

export default class Boss1 extends Boss {

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