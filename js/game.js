var gameSettings = {
  playerSpeed: 500,
  maxPowerups: 2,
  powerUpVel: 10,
}

var config = {
  width: 250,
  height: 420,
  backgroundColor: 0x000000,
  scene: [Scene1, Scene2],
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade:{
        debug: false,
        debugShowVelocity: false
    }
  }
}


var game = new Phaser.Game(config);
