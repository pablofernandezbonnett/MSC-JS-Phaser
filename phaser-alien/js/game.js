//Configuración de la escena
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "canvas",
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  scene: Escena,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  }
};

var game = new Phaser.Game(config);
