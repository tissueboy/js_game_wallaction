import Item from '../sprites/Item';

export default class Coin extends Item {
  constructor(config) {
    super(config);
    this.coinPoint = 1;

    // console.log("key",config.key);

  }
  // hasEffect(player,item){
  //   player.hp = player.hp + item.recoveryPoint;
  //   this.scene.updateHp(player.hp);
  //   item.destroy();
    
  // }
  hit(){
    this.scene.coin_count = this.scene.coin_count + this.coinPoint;
    this.scene.coinText.text = "x "+this.scene.coin_count;
    // this.scene.coin.calc(this.coinPoint);
    this.destroy();
  }
}