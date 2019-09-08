import Keypad from '../helper/Keypad';
import Hp from '../helper/Hp';
import ActiveTime from '../helper/ActiveTime';
import CollisionCheck from '../sprites/CollisionCheck';
import Player from '../sprites/Player';
import Enemy from '../sprites/Enemy';
import Item from '../sprites/Item';
import Heart from '../sprites/Heart';

class GameScene extends Phaser.Scene {
  constructor(test) {
    super({
        key: 'GameScene'
    });
  }
  create(){

    /*==============================
    ステージの表示
    ==============================*/
    this.map = this.make.tilemap({ key: 'map' });
    this.tileset = this.map.addTilesetImage('tileset', 'tiles');
    this.groundLayer = this.map.createDynamicLayer('ground', this.tileset, 0, 0);
    this.groundLayer.setCollisionBetween(0, 1);
    this.groundLayer.setCollisionByProperty({ collides: true });
    this.groundLayer.depth = 1;

    this.objectLayer = this.map.createDynamicLayer('object', this.tileset, 0, 0);
    this.objectLayer.setCollisionBetween(2, 2);
    this.objectLayer.setCollisionByProperty({ collides: true });
    this.objectLayer.depth = 2;

    this.player = new Player({
      scene: this,
      key: 'player',
      x: 40,
      y: 100,
      hp: this.hp,
    });
    this.player.depth = 11;

    this.enemy = new Enemy({
      scene: this,
      key: 'enemy',
      x: 100,
      y: 100
    });
    this.enemy.depth = 12;





    /*==============================
    キー入力
    ==============================*/

    this.keypad = new Keypad({
      scene: this,
      key: 'keypad',
      input: this.input,
      mode: "smooth"
    });
    this.keypad.depth = 102;

    /*==============================
    UI
    ==============================*/

    this.hp = new Hp({
      scene: this,
      key: 'hp'
    });
    this.hp.depth = 104;

    this.active_time = new ActiveTime({
      scene: this,
      key: 'active_time'
    });

    /*==============================
    UI | コイン
    ==============================*/
    this.coin_count = 0;

    this.coinText = this.add.text(this.game.config.width/2+20,5, "x "+this.coin_count, {
      fontFamily: 'monospace',
      fontSize: 10,
      fontStyle: 'bold',
      color: '#FFFFFF',
      align: 'center',
      style:{
      }
    });

    this.coinText.depth = 104;

    this.coinText.setScrollFactor(0,0);

    this.coinIcon = this.add.sprite(this.game.config.width/2+10,12, 'ui_coin_icon');
    this.coinIcon.setScrollFactor(0,0);
    this.coinIcon.depth = 104;


    /*==============================
    UI | レベル
    ==============================*/
    this.level_count = 0;

    this.levelText = this.add.text(this.game.config.width/4*3+20,5, "x "+this.level_count, {
      fontFamily: 'monospace',
      fontSize: 10,
      fontStyle: 'bold',
      color: '#FFFFFF',
      align: 'center',
      style:{
      }
    });

    this.levelText.depth = 104;

    this.levelText.setScrollFactor(0,0);

    this.levelIcon = this.add.sprite(this.game.config.width/4*3+10,12, 'ui_level_icon');
    this.levelIcon.setScrollFactor(0,0);
    this.levelIcon.depth = 104;




    this.bulletGroup = this.add.group();
    this.bulletGroup.depth = 13;
    this.bulletEnemyGroup = this.add.group();
    this.bulletEnemyGroup.depth = 14;
    // this.physics.add.overlap(this.player, this.enemyGroup, this.enemyCollision);

    this.itemGroup = this.add.group();
    this.itemGroup.depth = 5;

    this.parseObjectLayers();

    /*==============================
    衝突判定
    ==============================*/
    this.CollisionCheck = new CollisionCheck({
      scene: this
    });
    /*==============================
    カメラ
    ==============================*/
    this.cameras.main.startFollow(this.player, true, 0.5, 0.5);
    
  }
  update(time, delta) {

    this.player.update(this.keypad.keys, time, delta);

    this.bulletGroup.children.entries.forEach(
      (sprite) => {
        sprite.update(time, delta);
      }
    );
    this.bulletEnemyGroup.children.entries.forEach(
      (sprite) => {
        sprite.update(time, delta);
      }
    ); 

    this.enemy.update(this.keypad.keys, time, delta);

    this.keypad.update(this.input);

    this.active_time.update(this.keypad.keys, time, delta);

  }
  parseObjectLayers() {
    this.map.getObjectLayer('items').objects.forEach(
      (item) => {
        let itemObject;

        switch (item.name) {
          case 'heart':
            itemObject = new Heart({
              scene: this,
              key: 'heart',
              x: item.x,
              y: item.y
            });
            itemObject.depth = 10;
            this.itemGroup.add(itemObject);
            break;                    
          default:
            // console.error('Unknown:', enemy.name); // eslint-disable-line no-console
            break;
        }
      }
    );

  }
}

export default GameScene;
