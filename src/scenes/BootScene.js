class BootScene extends Phaser.Scene {
  constructor(test) {
    super({
      key: 'BootScene'
    });
  }
  preload() {
    const progress = this.add.graphics();

    this.load.on('progress', (value) => {
      progress.clear();
      progress.fillStyle(0xffffff, 1);
      progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
    });

    this.load.on('complete', () => {
      progress.destroy();
      this.scene.start('GameScene');
    });

    this.load.image('tiles', 'assets/tilemaps/tile.png');
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/tilemap.json');
    
    this.load.spritesheet('player', 'assets/images/player.png', { frameWidth: 16, frameHeight: 22 });    
    this.load.spritesheet('enemy', 'assets/images/enemy.png', { frameWidth: 16, frameHeight: 16 });    

    /*UI*/
    this.load.image('hp_bar', 'assets/images/ui/hp_bar.png');
    this.load.image('active_bar', 'assets/images/ui/active_bar.png');
    this.load.image('ui_coin_icon', 'assets/images/ui/coin.png');
    this.load.image('ui_level_icon', 'assets/images/ui/level.png');

    this.load.image('sword', 'assets/images/sword.png');
    this.load.spritesheet('sword_anime', 'assets/images/sword_anime.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('bullet', 'assets/images/bullet.png');
    this.load.image('arrow', 'assets/images/arrow.png');

    /*item*/
    this.load.image('heart', 'assets/images/items/heart.png');
    this.load.image('coin', 'assets/images/items/coin.png');


  }
}

export default BootScene;
