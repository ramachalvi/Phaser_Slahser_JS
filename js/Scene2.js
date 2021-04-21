class Scene2 extends Phaser.Scene {
    constructor() {
      super("playGame");
  
    }
  
    create() {
  
      this.background = this.add.tileSprite(0, 0, config.width, config.height, "backgrounds");
      this.background.setOrigin(0, 0);
  
      this.musuh1 = this.add.sprite(config.width / 2 - 50, config.height / 2, "musuh");
      this.musuh2 = this.add.sprite(config.width / 2, config.height / 2, "musuh2");
      this.musuh3 = this.add.sprite(config.width / 2 + 50, config.height / 2, "musuh3");
  
      this.enemies = this.physics.add.group();
      this.enemies.add(this.musuh1);
      this.enemies.add(this.musuh2);
      this.enemies.add(this.musuh3);
  
  
      this.musuh1.play("musuh1_anim");
      this.musuh2.play("musuh2_anim");
      this.musuh3.play("musuh3_anim");
  
      this.musuh1.setInteractive();
      this.musuh2.setInteractive();
      this.musuh3.setInteractive();
  
      this.input.on('gameobjectdown', this.destroyMusuh, this);
  
      this.physics.world.setBoundsCollision();
  
      this.powerUps = this.physics.add.group();
  
  
      for (var i = 0; i < gameSettings.maxPowerups; i++) {
        var powerUp = this.physics.add.sprite(16, 16, "power-up");
        this.powerUps.add(powerUp);
        powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);
  
        if (Math.random() > 0.5) {
          powerUp.play("red");
        } else {
          powerUp.play("gray");
        }
  
        powerUp.setVelocity(gameSettings.powerUpVel, gameSettings.powerUpVel);
        powerUp.setCollideWorldBounds(true);
        powerUp.setBounce(1);
  
      }
  
  
      this.player = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, "pemain");
      this.player.play("thrust");
      this.cursorKeys = this.input.keyboard.createCursorKeys();
      this.player.setCollideWorldBounds(true);
  
  
  
      this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  
      this.projectiles = this.add.group();
  
      this.physics.add.collider(this.projectiles, this.powerUps, function(projectile, powerUp) {
        projectile.destroy();
      });
  
      this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);
  
      this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);
  
      this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);
  
      var graphics = this.add.graphics();
      graphics.fillStyle(0x000000, 1);
      graphics.beginPath();
      graphics.moveTo(0, 0);
      graphics.lineTo(config.width, 0);
      graphics.lineTo(config.width, 20);
      graphics.lineTo(0, 20);
      graphics.lineTo(0, 0);
      //
      graphics.closePath();
      graphics.fillPath();
  
      this.score = 0;
      var scoreFormated = this.zeroPad(this.score, 6);
      this.scoreLabel = this.add.bitmapText(10, 5, "pixelFont", "SCORE " + scoreFormated  , 16);
  
      //
      this.beamSound = this.sound.add("audio_beam");
      this.explosionSound = this.sound.add("audio_explosion");
      this.pickupSound = this.sound.add("audio_pickup");
  
      // 
      this.music = this.sound.add("music");
  
      var musicConfig = {
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
      }
  
      this.music.play(musicConfig);
  
    }
  
    pickPowerUp(player, powerUp) {
      powerUp.disableBody(true, true);
      //
      this.pickupSound.play();
    }
  
    hurtPlayer(player, enemy) {
  
      this.resetMusuhPos(enemy);
  
      if(this.player.alpha < 1){
          return;
      }
  
      var explosion = new Explosion(this, player.x, player.y);
  
      player.disableBody(true, true);
  
      this.time.addEvent({
        delay: 1000,
        callback: this.resetPlayer,
        callbackScope: this,
        loop: false
      });
    }
  
    resetPlayer(){
      var x = config.width / 2 - 8;
      var y = config.height + 64;
      this.player.enableBody(true, x, y, true, true);
  
  
      this.player.alpha = 0.5;
  
      var tween = this.tweens.add({
        targets: this.player,
        y: config.height - 64,
        ease: 'Power1',
        duration: 1500,
        repeat:0,
        onComplete: function(){
          this.player.alpha = 1;
        },
        callbackScope: this
      });
    }
  
    hitEnemy(projectile, enemy) {
  
      var explosion = new Explosion(this, enemy.x, enemy.y);
  
      projectile.destroy();
      this.resetMusuhPos(enemy);
      this.score += 15;
  
       var scoreFormated = this.zeroPad(this.score, 6);
       this.scoreLabel.text = "SCORE " + scoreFormated;
  
       // 
       this.explosionSound.play();
    }
  
  
    zeroPad(number, size){
        var stringNumber = String(number);
        while(stringNumber.length < (size || 2)){
          stringNumber = "0" + stringNumber;
        }
        return stringNumber;
    }
  
  
  
  
    update() {
  
  
  
      this.moveMusuh(this.musuh1, 1);
      this.moveMusuh(this.musuh2, 2);
      this.moveMusuh(this.musuh3, 3);
  
      this.background.tilePositionY -= 0.5;
  
  
      this.movePlayerManager();
  
      if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
        if(this.player.active){
            this.shootBeam();
        }
      }
      for (var i = 0; i < this.projectiles.getChildren().length; i++) {
        var beam = this.projectiles.getChildren()[i];
        beam.update();
      }
  
  
    }
  
    shootBeam() {
        var beam = new Beam(this);
        // 
        this.beamSound.play();
    }
  
  
    movePlayerManager() {
  
      this.player.setVelocity(0);
  
      if (this.cursorKeys.left.isDown) {
        this.player.setVelocityX(-gameSettings.playerSpeed);
      } else if (this.cursorKeys.right.isDown) {
        this.player.setVelocityX(gameSettings.playerSpeed);
      }
  
      if (this.cursorKeys.up.isDown) {
        this.player.setVelocityY(-gameSettings.playerSpeed);
      } else if (this.cursorKeys.down.isDown) {
        this.player.setVelocityY(gameSettings.playerSpeed);
      }
    }
  
  
  
    moveMusuh(musuh, speed) {
      musuh.y += speed;
      if (musuh.y > config.height) {
        this.resetMusuhPos(musuh);
      }
    }
  
    resetMusuhPos(musuh) {
      musuh.y = 0;
      var randomX = Phaser.Math.Between(0, config.width);
      musuh.x = randomX;
    }
  
  
  
    destroyMusuh(pointer, gameObject) {
      gameObject.setTexture("explosion");
      gameObject.play("explode");
    }
  
  
  }
  