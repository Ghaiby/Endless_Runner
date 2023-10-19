let config = {
    width: 640,
    height:480,
    scene: [Menu, Play], 
}

const game = new Phaser.Game(config);

let keyF, keyR, keyLEFT, keyRIGHT;

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3; 