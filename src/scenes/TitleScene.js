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


    this.start_text_pc = this.make.text({
        x: 80,
        y: 100,
        text: 'PC MODE',
        origin: { x: 0.5, y: 0.5 },
        style: {
            font: 'bold 12px Arial',
            align: 'center',
            fill: 'white',
            wordWrap: { width: 100 }
        }
    });

    this.start_text_sph = this.make.text({
        x: 80,
        y: 140,
        text: 'SPH MODE',
        origin: { x: 0.5, y: 0.5 },
        style: {
            font: 'bold 12px Arial',
            align: 'center',
            fill: 'white',
            wordWrap: { width: 100 }
        }
    });

    this.start_text_pc.setInteractive();
    this.start_text_sph.setInteractive();

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
