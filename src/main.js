// Guy Haiby, 'Jukes', 21 hours 
// I used the Acceleration associated with the player's physics body to make the movement feel more fun and appropriate for the game. this lines 107 -123 in play. 
// I created the spritesheets for the players myself and I tried my best to make the running movement look reasonalble even tough they kind of look like they are swimming
let config = {
    width: 832,
    height:720,
    scene: [Menu, Play],
    render: {pixelArt: true},
    physics:{
        default: 'arcade',
        arcade: {
            debug: true 
        },
    },
}

const game = new Phaser.Game(config);

let keyLEFT, keyRIGHT, keyR;

let borderUISize = game.config.height / 24;
