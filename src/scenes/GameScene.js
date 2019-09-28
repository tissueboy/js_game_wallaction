import Keypad from '../helper/Keypad';
import Keypad_PC from '../helper/Keypad_PC';
import Hp from '../helper/Hp';
import ActiveTime from '../helper/ActiveTime';

import CollisionCheck from '../sprites/CollisionCheck';
import Player from '../sprites/Player';

import Item from '../sprites/Item';
import Heart from '../sprites/Heart';
import Coin from '../sprites/Coin';
import Fire from '../sprites/Fire';
import CreateEnemy from '../helper/CreateEnemy';

class GameScene extends Phaser.Scene {
  constructor(test) {
    super({
        key: 'GameScene'
    });
  }
  create(){

    console.log("this",this.registry.list.MODE);

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

    this.createEnemy = new CreateEnemy({
      scene: this
    });

    /*==============================
    キー入力
    ==============================*/
    this.keypad;
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
    this.combo_count = 0;

    this.comboText = this.add.text(this.game.config.width/2+20,15, "x "+this.combo_count, {
      fontFamily: 'monospace',
      fontSize: 10,
      fontStyle: 'bold',
      color: '#FFFFFF',
      align: 'center',
      style:{
      }
    });

    this.comboText.depth = 104;

    this.comboText.setScrollFactor(0,0);

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
    
    this.keypad.update(this.input);

    this.active_time.update(this.keypad.keys, time, delta);

  }
}

export default GameScene;
