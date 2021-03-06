class BootScene extends Phaser.Scene {
  constructor(test) {
    super({
      key: 'BootScene'
    });
  }
  preload() {
    this.progress = this.add.graphics();

    this.load.on('progress', (value) => {
      this.progress.clear();
      this.progress.fillStyle(0xffffff, 1);
      this.progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
    });

    this.load.on('complete', () => {
      this.progress.destroy();
      this.scene.start('TitleScene');
    });

    this.load.image('tiles', 'assets/tilemaps/tile.png');
    this.load.tilemapTiledJSON('map1', 'assets/tilemaps/tilemap.json');
    this.load.tilemapTiledJSON('map2', 'assets/tilemaps/tilemap2.json');
    
    this.load.spritesheet('player', 'assets/images/player.png', { frameWidth: 16, frameHeight: 22 });    
    this.load.spritesheet('enemy', 'assets/images/enemy.png', { frameWidth: 16, frameHeight: 16 });    
    this.load.spritesheet('bad', 'assets/images/bad.png', { frameWidth: 10, frameHeight: 10 });    
    this.load.image('brain', 'assets/images/brain.png');
    this.load.image('wizerd', 'assets/images/wizerd.png');
    this.load.image('wizerd2', 'assets/images/wizerd2.png');
    this.load.image('wizerd3', 'assets/images/wizerd3.png');
    this.load.image('boss1', 'assets/images/boss1.png');
    this.load.image('boss2', 'assets/images/boss2.png');

    /*UI*/
    this.load.image('hp_bar', 'assets/images/ui/hp_bar.png');
    this.load.image('hp_bar_bg', 'assets/images/ui/hp_bar_bg.png');
    this.load.image('hp_bar_s', 'assets/images/ui/hp_bar_s.png');
    this.load.image('active_bar', 'assets/images/ui/active_bar.png');
    this.load.image('ui_coin_icon', 'assets/images/ui/coin.png');
    this.load.image('ui_level_icon', 'assets/images/ui/level.png');
    this.load.image('cursor', 'assets/images/ui/cursor.png');
    this.load.image('menu', 'assets/images/ui/menu.png');

    this.load.image('bullet', 'assets/images/bullet.png');
    this.load.image('barrier', 'assets/images/barrier.png');
    this.load.image('sword', 'assets/images/sword.png');
    this.load.image('scope', 'assets/images/scope.png');
    this.load.image('axe', 'assets/images/axe.png');

    this.load.image('title_start', 'assets/images/title_start.png');

    this.load.bitmapFont('bitmapFont', 'assets/font/font.png', 'assets/font/font.xml');
    this.load.bitmapFont('bitmapFontYellow', 'assets/font/font_yellow.png', 'assets/font/font.xml');

    /*item*/
    this.load.image('heart', 'assets/images/items/heart.png');
    this.load.image('coin', 'assets/images/items/coin.png');
    this.load.image('fire', 'assets/images/items/fire.png');
    this.load.image('star', 'assets/images/items/star.png');
    this.load.image('portion', 'assets/images/items/portion.png');

    this.load.image('fire_area', 'assets/images/items/fire_area.png');

    //spritesheetは画像のサイズを合わせないとframe errorになる...
    this.load.spritesheet('explosion_m', 'assets/images/explosion_m.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('explosion_s', 'assets/images/explosion_s.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('player_star', 'assets/images/player_star.png', { frameWidth: 16, frameHeight: 22 });
    this.load.spritesheet('sword_anime', 'assets/images/sword_anime.png', { frameWidth: 40, frameHeight: 40 });
    this.load.spritesheet('sword_anime_l', 'assets/images/sword_anime_l.png', { frameWidth: 80, frameHeight: 80 });

  }

}

export default BootScene;
