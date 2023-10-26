class Alien extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.ranDirection =  Math.floor(Math.random() * 2) + 1;
        this.moveSpeed = game.settings.spaceshipSpeed * 1.2;
        if(this.ranDirection ==1){
            this.setFlipX(true);
        }
    }

    update(){
        if(this.ranDirection == 1){
            this.x += this.moveSpeed;
            if(this.x > game.config.width){
                this.x = 0;
            }
        }else{
            this.x -= this.moveSpeed;
            if( this.x <= 0 - this.width){
                this.x = game.config.width;
            }
        }
      

    }
    reset(){
        this.x = game.config.width;
    }

}