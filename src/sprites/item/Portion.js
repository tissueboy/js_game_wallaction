import Item from './Item';

export default class Portion extends Item {
  constructor(config) {
    super(config.scene);
    console.log("Portion");
    this.key = "portion";
    this.frame = "portion";
    this.recoveryPoint = 5;
    this.scene.hp.calc(this.recoveryPoint);
    this.destroy();  
  }
}