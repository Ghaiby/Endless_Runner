class Menu extends Phaser.Scene{
    constructor (){
        super('menuScene')
    }
    preload(){
        // load audio
      this.load.audio('sfx_select', './assets/select.mp3');
      this.load.image('field', './assets/field3.png');
      this.load.image('player_large', './assets/player1_large.png');
    }
    create(){
        let menuConfig = {
            fontFamily: 'Helvetica',
            fontSize: '32px',
            color: '#F0F0F0',
            align: 'right',
            padding:{
                top: 5, 
                bottom: 5,
            },
            fixedWidth: 0 
        }

        //add field backdroung
        this.field = this.add.tileSprite(0, 0, 832, 900, 'field').setOrigin(0,0);
        this.player = this.add.image(game.config.width/2,game.config.height/3,'player_large');

        //show menu text 
        this.add.text(game.config.width/2,game.config.height/1.5,'Jukes', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2,game.config.height/1.5 + game.config.height/20,'Press <- or -> to start',menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2,game.config.height/1.5 + game.config.height/8,'Use <- and -> to avoid tackles',menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2,game.config.height/1.5 + game.config.height/4,'Music: \'Running\' by Moire, Art: Guy Haiby',menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT) ||Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        
      }

}