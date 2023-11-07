class Play extends Phaser.Scene{
    constructor (){
        super('playScene')
    }

    preload(){
        this.load.image('field', './assets/field3.png');
        this.load.audio('sfx_hit', './assets/hit.mp3');
        this.load.audio('sfx_over', './assets/gameover.mp3');
        this.load.audio('sfx_start', './assets/gamestart.mp3');

        this.load.audio('backgroundMusic', './assets/running_music.mp3');
        this.load.spritesheet('player', './assets/Player1_spsh.png',{
            frameWidth: 104,
            frameHeight: 90,
        })
        this.load.spritesheet('opp', './assets/Player2_spsh.png',{
            frameWidth: 104,
            frameHeight: 90,
        })
    }

    create(){
        this.sound.play('sfx_start');
        this.backgroundMusic = this.sound.add('backgroundMusic', { loop: true });
        this.backgroundMusic.play();

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        //gameover flag
        this.gameover = false
        // add field
        this.field = this.add.tileSprite(0, 0, 832, 900, 'field').setOrigin(0,0);
        this.add.rectangle(0, 0, borderUISize * 2, game.config.height ,0xF0F0F0).setOrigin(0, 0);
        this.add.rectangle(game.config.width-borderUISize * 2, 0, borderUISize * 2, game.config.height ,0xF0F0F0).setOrigin(0, 0);
        
        this.physics.world.setBounds(borderUISize * 2,0,game.config.width-borderUISize * 4,game.config.heigt, true,true);

        this.player = new Player(this, game.config.width/2, game.config.height - game.config.height/7, 'player').setOrigin(0.5, 0);
        this.physics.world.enable(this.player);
        this.player.create();
        this.player.play('run');
        this.player.body.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.opps = this.add.group();
        this.spawnSpeed = 3000;
        this.numOpps = 8;
        this.spawnOpps(this.numOpps);

        //spawn again after  3 sec 
        this.time.addEvent({
            delay: this.spawnSpeed, 
            callback: this.spawnOpps,
            args: [this.numOpps],
            callbackScope: this,
            loop: true, 
        });

        //Score
        this.score = 0; 
        let scoreConfig = {
            fontFamily: 'Helvetica',
            fontSize: '36px',
            //backgroundColor: 'rgba(255,255,255,0.2)',
            color: '#FFFF00',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
        }
        this.scoreText = this.add.text(game.config.width/10, game.config.height/12, this.score, scoreConfig);

        //Collisions
        this.physics.add.collider(this.player,this.opps, ()=> {
            this.sound.play('sfx_hit');
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/1.8, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.sound.play('sfx_over');
            this.gameover = true;
        })

        this.oppSpeed = 2;
        this.wave= 0;
    }

    update(){
        if(this.gameover){
            this.backgroundMusic.stop();
            this.opps.getChildren().forEach(opp => { 
                opp.destroy();
            });

            this.player.body.setAccelerationX(0);
            this.player.body.setVelocityX(0);
            // check key input for restart
            if (this.gameover && Phaser.Input.Keyboard.JustDown(keyR)) {
                this.scene.restart();
            }

            if (this.gameover && this.cursors.left.isDown) {
                this.scene.start("menuScene");
            }
            return;
        }
        this.field.tilePositionY -= 1.5;
        Phaser.Actions.IncY(this.opps.getChildren(),this.oppSpeed)

            // Move player
        if (this.cursors.left.isDown) {
            this.player.body.setAccelerationX(-this.player.acceleration);
            this.player.setFlipX(true);
        } else if (this.cursors.right.isDown) {
            this.player.body.setAccelerationX(this.player.acceleration);
            this.player.setFlipX(false);
        } else {
            // Apply friction when the player not moving
            if (this.player.body.velocity.x > 0) {
                this.player.body.setAccelerationX(-this.player.friction);
            } else if (this.player.body.velocity.x < 0) {
                this.player.body.setAccelerationX(this.player.friction);
            } else {
                // Stop the player
                this.player.body.setAccelerationX(0);
            }
        }

        // Dont let player speed go over max 
        if (Math.abs(this.player.body.velocity.x) > this.player.speed) {
            if(this.player.body.velocity.x >0){
                this.player.body.velocity.x =  this.player.speed;
            }else if(this.player.body.velocity.x <0){
                this.player.body.velocity.x =  -this.player.speed;
            }
        }

        this.opps.getChildren().forEach(opp => {
            if (opp.y >= game.config.height) {
                opp.destroy();
                this.score += 1;
                this.scoreText.text = this.score;
            }
        });

    }

    spawnOpps( num ){
        this.wave += 1;
        if(this.wave == 6 ||this.wave == 13 || this.wave == 20){
            this.oppSpeed+=0.5;
            //console.log(this.oppSpeed);
        }

        for(let i = 0; i < num; i++){
            const randomX = Phaser.Math.Between( 104, game.config.width - 104);
            const randomY = Phaser.Math.Between( -game.config.height/1.7,0);
            const opp = new Opp(this, randomX,  randomY, 'opp').setOrigin(0.5, 0);
            this.physics.world.enable(opp);
            opp.create();
            if(opp.x < game.config.width/2){
                opp.setFlipX(true);
            }
            this.add.existing(opp);
            this.opps.add(opp);
            opp.play('run');
        }
    }
}