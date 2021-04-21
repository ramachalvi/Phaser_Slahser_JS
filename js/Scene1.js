class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  preload(){
    this.load.image("backgrounds", "assets/images/backgrounds.jpg");
    //
    this.load.spritesheet("musuh", "assets/spritesheets/musuh.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("musuh2", "assets/spritesheets/musuh2.png",{
      frameWidth: 32,
      frameHeight: 16
    });
    this.load.spritesheet("musuh3", "assets/spritesheets/musuh3.png",{
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("explosion", "assets/spritesheets/explosion.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("powerup", "assets/spritesheets/powerup.png",{
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.spritesheet("pemain", "assets/spritesheets/pemain.png",{
      frameWidth: 16,
      frameHeight: 24
    });
    this.load.spritesheet("beam", "assets/spritesheets/beam.png",{
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");

    // 
    this.load.audio("audio_beam", ["assets/sounds/beam.ogg", "assets/sounds/beam.mp3"]);
    this.load.audio("audio_explosion", ["assets/sounds/explosion.ogg", "assets/sounds/explosion.mp3"]);
    this.load.audio("audio_pickup", ["assets/sounds/pickup.ogg", "assets/sounds/pickup.mp3"]);
    this.load.audio("music", ["assets/sounds/sci-fi_platformer12.ogg", "assets/sounds/sci-fi_platformer12.mp3"]);
  }

  create() {



    this.add.text(20, 20, "Loading game...");
    this.scene.start("playGame");

    this.anims.create({
      key: "musuh1_anim",
      frames: this.anims.generateFrameNumbers("musuh"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "musuh2_anim",
      frames: this.anims.generateFrameNumbers("musuh2"),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "musuh3_anim",
      frames: this.anims.generateFrameNumbers("musuh3"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });

    this.anims.create({
      key: "red",
      frames: this.anims.generateFrameNumbers("powerup", {
        start: 0,
        end: 1
      }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "gray",
      frames: this.anims.generateFrameNumbers("powerup", {
        start: 2,
        end: 3
      }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "thrust",
      frames: this.anims.generateFrameNumbers("pemain"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "beam_anim",
      frames: this.anims.generateFrameNumbers("beam"),
      frameRate: 20,
      repeat: -1
    });



  }
}
