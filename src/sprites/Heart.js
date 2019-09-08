import Item from '../sprites/Item';

export default class Heart extends Item {
  constructor(config) {
    super(config);
    this.recoveryPoint = 1;

    // console.log("key",config.key);

  }
  // hasEffect(player,item){
  //   player.hp = player.hp + item.recoveryPoint;
  //   this.scene.updateHp(player.hp);
  //   item.destroy();
    
  // }
  hit(){
    console.log("hit");
    this.scene.hp.calc(this.recoveryPoint);
    this.destroy();
  }
}