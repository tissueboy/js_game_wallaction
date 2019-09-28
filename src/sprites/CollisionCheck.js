export default class CollisionCheck{
  constructor(config) {

    var _this = config.scene;
    this._scene = config.scene;
    _this.physics.add.collider(_this.player,_this.groundLayer);
    _this.physics.add.collider(_this.enemyGroup,_this.groundLayer);

    _this.physics.add.overlap(_this.player,_this.enemyGroup,this.player_x_Enemy_Collision);
    _this.physics.add.overlap(_this.player,_this.bulletEnemyGroup,this.player_x_EnemyBullet_Collision);
    // _this.physics.add.overlap(_this.enemy,_this.bulletGroup,this.enemyCollision);
    _this.physics.add.overlap(_this.enemyGroup,_this.bulletGroup,this.enemy_x_playerBullet_Collision);
    _this.physics.add.overlap(_this.player,_this.itemGroup,this.itemCollision);

    _this.physics.add.collider(_this.bulletGroup,_this.groundLayer,this.bulletBounceCollision);

    _this.physics.add.collider(_this.itemGroup,_this.groundLayer,this.itemCheckCollision);
    _this.physics.add.collider(_this.itemGroup,_this.enemyGroup,this.itemCheckCollision);


  }
  player_x_Enemy_Collision(player,enemy){
    player.damage(enemy.status.attackPoint);
  }
  player_x_EnemyBullet_Collision(player,enemyBullet){
    player.damage(enemyBullet.attackPoint);
    enemyBullet.explode();
  }
  enemy_x_playerBullet_Collision(enemy,obj){
    enemy.damage(obj.attackPoint);
    if(!enemy.active){
      return;
    }
    
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
