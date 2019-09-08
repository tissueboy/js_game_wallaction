export default class CollisionCheck{
  constructor(config) {

    var _this = config.scene;
    _this.physics.add.collider(_this.player,_this.groundLayer);
    _this.physics.add.collider(_this.enemy,_this.groundLayer);
    _this.physics.add.collider(_this.player,_this.enemy);

    _this.physics.add.overlap(_this.player,_this.bulletEnemyGroup,this.playerCollision);
    _this.physics.add.overlap(_this.enemy,_this.bulletGroup,this.enemyCollision);
    _this.physics.add.overlap(_this.player,_this.itemGroup,this.itemCollision);

  }
  playerCollision(player,obj){
    player.damage(obj.attackPoint);
    obj.explode();
  }
  enemyCollision(enemy,obj){
    console.log("enemyCollision body2.key",obj.type);
    enemy.damage(obj.attackPoint);
    obj.explode();
  }
  itemCollision(player,obj){
    console.log("itemCollision");
    obj.hit(player);
  }
}
