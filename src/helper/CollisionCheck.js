export default class CollisionCheck{
  constructor(config) {

    var _this = config.scene;
    this._scene = config.scene;
    _this.physics.add.collider(_this.player,_this.groundLayer);
    _this.physics.add.collider(_this.enemyGroup,_this.groundLayer);

    _this.physics.add.overlap(_this.player,_this.enemyGroup,this.player_x_Enemy_Collision);
    _this.physics.add.overlap(_this.player,_this.bulletEnemyGroup,this.player_x_EnemyBullet_Collision);

    _this.physics.add.overlap(_this.enemyGroup,_this.bulletGroup,this.enemy_x_playerBullet_Collision);
    _this.physics.add.overlap(_this.player,_this.itemGroup,this.player_x_item_Collision);

    _this.physics.add.collider(_this.bulletGroup,_this.groundLayer,this.bulletBounceCollision);

    _this.physics.add.overlap(_this.itemGroup,_this.groundLayer,this.item_x_ground_Collision);
    _this.physics.add.overlap(_this.itemGroup,_this.enemyGroup,this.item_x_enemy_Collision);


  }
  player_x_Enemy_Collision(player,enemy){
    if(!enemy.active){
      return;
    }
    player.damage(enemy.status.attackPoint);
    
  }
  player_x_EnemyBullet_Collision(player,enemyBullet){
    player.damage(enemyBullet.attackPoint);
    enemyBullet.explode();
  }
  enemy_x_playerBullet_Collision(enemy,obj){
    if(!enemy.active){
      return;
    }
    enemy.damage(obj.attackPoint);    
    obj.explode();
  }
  player_x_item_Collision(player,obj){
    if(!obj.active){
      return;
    }
    obj.hit(player);
  }
  item_x_ground_Collision(item,obj){
    // item.checkCollision(item,obj);
  }
  item_x_enemy_Collision(item,enemy){
    if(!enemy.active){
      return;
    }
    item.checkCollision(item,enemy);
  }
  bulletBounceCollision(bullet,ground){
    bullet.bounce(); 
  }
}
