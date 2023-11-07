class Opp extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);


    }
    
    create(){
        this.body.setSize(50, 80);
        this.anims.create({
            key: 'run',
            frameRate:22,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('opp', {
                start: 0, 
                end:8
            })

        })
    }



}