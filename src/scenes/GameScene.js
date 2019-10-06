import Keypad from '../helper/Keypad';
import Keypad_PC from '../helper/Keypad_PC';
import Hp from '../helper/Hp';
import ActiveTime from '../helper/ActiveTime';
import CollisionCheck from '../helper/CollisionCheck';
import CreateObjects from '../helper/CreateObjects';
import ComboCount from '../helper/ComboCount';

import Player from '../sprites/player/Player';
import Boss1 from '../sprites/enemy/Boss1';



class GameScene extends Phaser.Scene {
  constructor(test) {
    super({
        key: 'GameScene'
    });
  }
  create(){

    console.log("this",this);

    /*==============================
    ステージの表示
    ==============================*/
    this.map = this.make.tilemap({ key: 'map',tileWidth: 16, tileHeight: 16});
    this.tileset = this.map.addTilesetImage('tileset', 'tiles');
    this.groundLayer = this.map.createDynamicLayer('ground', this.tileset, 0, 0);
    this.groundLayer.setCollisionBetween(0, 2);
    this.groundLayer.setCollisionByProperty({ collides: true });
    this.groundLayer.depth = 1;

    this.objectLayer = this.map.createDynamicLayer('object', this.tileset, 0, 0);
    // this.objectLayer.setCollisionBetween(2, 2);
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

    /*==============================
    モンスターの生成
    ==============================*/

    this.createObjects = new CreateObjects({
      scene: this
    });

    /*==============================
    ボスの生成
    ==============================*/

    this.createBossTimerEvent = this.time.addEvent({
      delay: 10000,
      callback: this.createBoss,
      callbackScope: this,
      startAt: 0,
    });


    /*==============================
    キー入力
    ==============================*/
    this.keypad;
    console.log("this.registry.list.MODE",this.registry.list.MODE);
    if(this.registry.list.MODE === "PC"){
      this.keypad = new Keypad_PC({
        scene: this,
        key: 'keypad_pc',
        input: this.input
      });      
    }else{
      this.keypad = new Keypad({
        scene: this,
        key: 'keypad',
        input: this.input
      });            
    }
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
    UI | コンボカウンター
    ==============================*/

    this.combo = new ComboCount({
      scene: this,
      key: 'combo'
    });
    this.combo.depth = 104;


    /*==============================
    UI | コイン
    ==============================*/
    this.coin_count = 0;

    this.coinText = this.add.bitmapText(
      30,
      40,
      'bitmapFont',
      this.coin_count,
      30
    );

    this.coinText.depth = 104;

    this.coinText.setScrollFactor(0,0);

    this.coinIcon = this.add.sprite(20,46, 'ui_coin_icon');
    this.coinIcon.setScrollFactor(0,0);
    this.coinIcon.depth = 104;

    this.coin_bg_graphics = this.add.graphics({ fillStyle: { color: 0x000000 }});
    this.coin_bg_rect = new Phaser.Geom.Rectangle(10, 40, this.game.config.width / 4, 12);
    this.coin_bg_graphics.fillRectShape(this.coin_bg_rect);
    this.coin_bg_graphics.depth = 100;
    this.coin_bg_graphics.alpha = 0.6;


    /*==============================
    UI | レベル
    ==============================*/
    this.level_count = 0;

    /*==============================
    UI | 経験値
    ==============================*/
    this.experience = 0;

    this.swordGroup = this.add.group();
    this.swordGroup.depth = 13;

    this.bulletGroup = this.add.group();
    this.bulletGroup.depth = 13;
    this.bulletEnemyGroup = this.add.group();
    this.bulletEnemyGroup.depth = 14;

    this.enemyGroup = this.add.group();
    this.enemyGroup.depth = 10;

    this.itemGroup = this.add.group();
    this.itemGroup.depth = 5;

    this.spellGroup = this.add.group();
    this.spellGroup.depth = 5;

    this.boss1 = new Boss1({
      scene: this,
      key: 'boss1',
      x: 100,
      y: 80
    });

    // this.parseObjectLayers();

    /*==============================
    衝突判定
    ==============================*/
    this.CollisionCheck = new CollisionCheck({
      scene: this
    });

    // this.cameras.main.startFollow(this.player, true, 0.5, 0.5);
        
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


    // this.enemy.update(this.keypad.keys, time, delta);
    this.enemyGroup.children.entries.forEach(
      (sprite) => {
        sprite.update(time, delta);
      }
    );
    this.swordGroup.children.entries.forEach(
      (sprite) => {
        sprite.update(time, delta);
      }
    );

    this.itemGroup.children.entries.forEach(
      (sprite) => {
        sprite.update(time, delta);
      }
    );

    if(this.boss1.active == true){
      this.boss1.update(time, delta);
    }
    
    this.keypad.update(this.input);

    this.active_time.update(this.keypad.keys, time, delta);

  }
  createBoss(){

    this.boss1.active = true;

    this.createObjects.createObjTimerEvent.remove(false);
    this.createObjects.createObjTimerEvent = false;

    this.boss1.depth = 11;
    this.createBossTimerEvent.remove(false);
    this.createBossTimerEvent = null;
  }
}

export default GameScene;
