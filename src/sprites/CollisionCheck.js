export default class CollisionCheck{
  constructor(config) {

    var _this = config.scene;
    _this.physics.add.collider(_this.player,_this.groundLayer);
    _this.physics.add.collider(_this.enemyGroup,_this.groundLayer);
    _this.physics.add.collider(_this.player,_this.enemyGroup);

    _this.physics.add.overlap(_this.player,_this.bulletEnemyGroup,this.playerCollision);
    // _this.physics.add.overlap(_this.enemy,_this.bulletGroup,this.enemyCollision);
    _this.physics.add.overlap(_this.enemyGroup,_this.bulletGroup,this.enemyCollision);
    _this.physics.add.overlap(_this.player,_this.itemGroup,this.itemCollision);

    _this.physics.add.collider(_this.bulletGroup,_this.groundLayer,this.bulletBounceCollision);

    _this.physics.add.collider(_this.itemGroup,_this.groundLayer,this.itemCheckCollision);
    _this.physics.add.collider(_this.itemGroup,_this.enemyGroup,this.itemCheckCollision);


  }
  playerCollision(player,obj){
    player.damage(obj.attackPoint);
    obj.explode();
  }
  enemyCollision(enemy,obj){
    enemy.damage(obj.attackPoint);
    obj.explode();
  }
  itemCollision(player,obj){
    obj.hit(player);
  }
  itemCheckCollision(item,obj){
    item.checkCollision(obj);
  }
  bulletBounceCollision(bullet,ground){
    bullet.bounce(); 
  }
}
