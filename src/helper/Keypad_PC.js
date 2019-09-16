export default class Keypad_PC extends Phaser.Physics.Arcade.Sprite{
  constructor(config) {

    super(config.scene,config.key,config.input);

    this.range = 2;
    this.power = 2;
    this.rangeRadius = 16;
    this.rangeRadiusMin =  2;
    this.rangeRadius2Min =  2;
    this.input = config.input;
    // this.input.addPointer(3);
    this.keys = {
      TOUCH_START:{
        x: 0,
        y: 0
      },
      TOUCH_START2:{
        x: 0,
        y: 0
      },
      TOUCH_MOVE:{
        x: 0,
        y: 0
      },
      TOUCH_MOVE2:{
        x: 0,
        y: 0
      },
      DIRECTION:{
        x: 0,
        y: 0
      },
      DIRECTION2:{
        x: 0,
        y: 0
      },
      POINTER:{
        x: 0,
        y: 0
      },
      POINTER2:{
        x: 0,
        y: 0   
      },
      VECTOR:{
        x: 0,
        y: 0
      },
      VECTOR2:{
        x: this.rangeRadius,
        y: this.rangeRadius
      },
      isTOUCH: false,
      isRELEASE: false,
      isTOUCH2: false,
      isRELEASE2: false,
      RADIAN: 0,
      RADIAN2: 0,
      MotionRange2: false
    };
    this.t = 0.0;

    /*==============================
    コントローラー
    ==============================*/
    this.circle = new Phaser.Geom.Circle(0, 0, 10);//x,y.size
    this.pointer = this.scene.add.graphics({ fillStyle: { color: 0xFFFFFF } });
    this.pointer.fillCircleShape(this.circle);
    this.pointer.setVisible(false);
    this.pointer.depth = 101;
    this.pointer.setScrollFactor(0,0);

    this.circle_center = new Phaser.Geom.Circle(0, 0, 16);//x,y.size
    this.pointer_center = this.scene.add.graphics({ fillStyle: { color: 0xFFFFFF } });
    this.pointer_center.fillCircleShape(this.circle_center);
    this.pointer_center.setVisible(false);
    this.pointer_center.depth = 100;
    this.pointer_center.alpha = .5;
    this.pointer_center.setScrollFactor(0,0);


    this.key_up = config.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.key_left = config.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.key_down = config.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.key_right = config.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    config.input.on('pointerdown', function (pointer) {
        this.keys.TOUCH_START.x = pointer.x;
        this.keys.TOUCH_START.y = pointer.y;
        this.keys.POINTER.x = pointer.x;
        this.keys.POINTER.y = pointer.y;
        this.keys.isTOUCH = true;
        this.keys.isRELEASE = false;
    }, this);

    config.input.on('pointerup', function (pointer) {
        this.keys.isTOUCH = false;
        this.keys.isRELEASE = true;
        this.keys.TOUCH_START.x = 0;
        this.keys.TOUCH_START.y = 0;
        this.keys.DIRECTION.x = 0;
        this.keys.DIRECTION.y = 0;
    }, this);


    config.input.on('pointermove', function (pointer) {

      this.keys.POINTER.x = pointer.x;
      this.keys.POINTER.y = pointer.y;

      if(this.keys.isTOUCH == true){

        this.keys.TOUCH_MOVE.x = pointer.x - this.keys.TOUCH_START.x;
        this.keys.TOUCH_MOVE.y = pointer.y - this.keys.TOUCH_START.y;


        if(this.rangeRadius*this.rangeRadius <= this.keys.TOUCH_MOVE.x * this.keys.TOUCH_MOVE.x + this.keys.TOUCH_MOVE.y * this.keys.TOUCH_MOVE.y){
          this.keys.RADIAN = Math.atan2(this.keys.TOUCH_MOVE.x, this.keys.TOUCH_MOVE.y);

          this.keys.DIRECTION.x = this.rangeRadius * Math.sin(this.keys.RADIAN);
          this.keys.DIRECTION.y = this.rangeRadius * Math.cos(this.keys.RADIAN);
          this.keys.VECTOR.x = this.rangeRadius * Math.sin(this.keys.RADIAN);
          this.keys.VECTOR.y = this.rangeRadius * Math.cos(this.keys.RADIAN);
          this.keys.POINTER.x = this.keys.TOUCH_START.x + this.rangeRadius * Math.sin(this.keys.RADIAN);
          this.keys.POINTER.y = this.keys.TOUCH_START.y + this.rangeRadius * Math.cos(this.keys.RADIAN);
        }else{

          if(this.rangeRadiusMin*this.rangeRadiusMin <= this.keys.TOUCH_MOVE.x * this.keys.TOUCH_MOVE.x + this.keys.TOUCH_MOVE.y * this.keys.TOUCH_MOVE.y){

            this.keys.DIRECTION.x = this.keys.TOUCH_MOVE.x;
            this.keys.DIRECTION.y = this.keys.TOUCH_MOVE.y;
            this.keys.VECTOR.x = this.keys.TOUCH_MOVE.x;
            this.keys.VECTOR.y = this.keys.TOUCH_MOVE.y;

          }else{

            this.keys.DIRECTION.x = 0;
            this.keys.DIRECTION.y = 0;
            this.keys.VECTOR.x = this.rangeRadius;
            this.keys.VECTOR.y = this.rangeRadius;

          }
        }


      }else{
        this.keys.DIRECTION.x = 0;
        this.keys.DIRECTION.y = 0;
      }

      this.keys.TOUCH_START2 = this.keys.TOUCH_START;
      this.keys.TOUCH_MOVE2 = this.keys.TOUCH_MOVE;
      this.keys.DIRECTION2 = this.keys.DIRECTION;
      this.keys.VECTOR2 = this.keys.VECTOR;
      this.keys.POINTER2 = this.keys.POINTER;
      this.keys.RADIAN2 = this.keys.RADIAN;

    }, this);


    /*==============================
    デバッグ
    ==============================*/
    // this.text = this.scene.add.text(10, 10, 'Use up to 4 fingers at once', { font: '8px Courier', fill: '#ff0000' });
    // this.text.depth = 100;
    // this.text.setScrollFactor(0,0);

  }
  update(){

    // this.text.setText([
    //   'pointer1.isDown: ' + this.input.pointer1.isDown,
    //   'pointer2.isDown: ' + this.input.pointer2.isDown,
    //   'pointer1.x: ' + this.input.pointer1.x,
    //   'pointer2.x: ' + this.input.pointer2.x,
    // ]);    
    if(this.keys.isTOUCH === true){

      this.pointer.setVisible(true);
      this.pointer_center.setVisible(true);

      this.pointer.x = this.keys.POINTER.x;
      this.pointer.y = this.keys.POINTER.y;

      this.pointer_center.x = this.keys.TOUCH_START.x;
      this.pointer_center.y = this.keys.TOUCH_START.y;

    }else{
      this.pointer.setVisible(false);
      this.pointer_center.setVisible(false);
    }
    if (this.spaceKey.isDown){
        this.keys.isTOUCH2 = true;
    }
    this.keys.isRELEASE2 = false;
    if (Phaser.Input.Keyboard.JustUp(this.spaceKey)){
      this.keys.isTOUCH2 = false;
      this.keys.isRELEASE2 = true;
    }
  }
}