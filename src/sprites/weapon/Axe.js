import Bullet from './Bullet';

export default class Axe extends Bullet {

  constructor(config) {

    super(config);

    console.log("this.axe",this);

    
    var axeTween = this.scene.tweens.add({
      targets: this,
      angle: 360,
      repeat: -1,
      duration: 400,
    });
  }

}