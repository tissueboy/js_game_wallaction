class TitleScene extends Phaser.Scene {
  constructor(test) {
    super({
        key: 'TitleScene'
    });
  }
  create() {
    let config = {
      key: 'title',
      frames: [{
          frame: 'title',
      }]
    };
      
  }
  startGame() {
      this.scene.stop('GameScene');
      this.scene.start('GameScene');
  }
}

export default TitleScene;
