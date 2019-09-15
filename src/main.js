import 'phaser';
import BootScene from './scenes/BootScene';
import TitleScene from './scenes/TitleScene';
import GameScene from './scenes/GameScene';

const config = {
  type: Phaser.WEBGL,
  pixelArt: true,
  roundPixels: true,
  parent: 'content',
  width: 160,
  height: 240,
  physics: {
    default: 'arcade',
    arcade: {
      // fps: 30,
      gravity: {
          y: 0
      },
      // debug: true
    }
  },
  scene: [
    BootScene,
    TitleScene,
    GameScene
  ]
};

const game = new Phaser.Game(config);
