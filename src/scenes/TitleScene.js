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


    this.start_text_pc = this.add.bitmapText(
      0, 100,'bitmapFont','',30
    );
    this.start_text_pc.setInteractive()
    // this.start_text_pc.setOrigin(0.5).setCenterAlign().setInteractive();
    this.start_text_pc.depth = 100;
    this.start_text_pc.getTextBounds(true);
    // this.start_text_pc.setText(
    //   ['ABCDEFGHIGKLM',
    //   'NOPQRSTUVWXYZ',
    //   'abcdefghijklm',
    //   'nopqrstuvwxyz',
    //   ' !"#$%&()*+,-./',
    //   '0123456789:;<=>?@'],
    // );
    this.start_text_pc.setText(
      ['PC MODE']
    );

    this.start_text_sph = this.add.bitmapText(
      0, 140,'bitmapFont','',30
    );
    this.start_text_sph.depth = 100;
    this.start_text_sph.setInteractive();
    // this.start_text_sph.getTextBounds(true);
    this.start_text_sph.setText(
      ['SP MODE']
    );

    this.graphics = this.add.graphics({ x: 0, y: 0, fillStyle: { color: 0xff00ff, alpha: 1 } });

    // this.bounds1 = this.start_text_pc.getTextBounds(true);
    // this.bounds2 = this.start_text_sph.getTextBounds(true);

    // this.graphics.fillRect(this.bounds1.global.x, this.bounds1.global.y, this.bounds1.global.width, this.bounds1.global.height);
    // this.graphics.fillRect(this.bounds2.global.x, this.bounds2.global.y, this.bounds2.global.width, this.bounds2.global.height);


    this.start_text_pc.on('pointerdown', () => {
      this.registry.set('MODE', "PC");
      this.startGame();
    });  
    this.start_text_sph.on('pointerdown', () => {
      this.registry.set('MODE', "SPH");
      this.startGame();
    }); 

  }
  startGame() {
    this.scene.stop('GameScene');
    this.scene.start('GameScene');
  }
}

export default TitleScene;
