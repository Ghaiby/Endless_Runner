class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);

        this.speed = 200;
        this.acceleration = 600;
        this.friction = 500;
    }
    
    create(){
        this.body.setSize(50, 80);
        this.anims.create({
            key: 'run',
            frameRate:18,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {
                start: 0, 
                end:8
            })

        })
    }



}