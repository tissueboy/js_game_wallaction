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
    this.start_text_sph.setInteractive()
    this.start_text_sph.setText(
      ['SP MODE']
    );




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
