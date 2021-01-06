class AlienRosa extends Phaser.Physics.Arcade.Sprite {
  constructor(escena, x, y) {
    super(escena, x, y, "PinkShip");
    // Guardar referencia a la escena
    this.escena = escena;
    // Añadir a la escena
    this.escena.add.existing(this);
    // Sí es fisico también hay que añadirlo a Physics
    this.escena.physics.add.existing(this);
    this.setVelocityX(300);
    // speed var
    this.velocidad = 0;
  }

  update() {
    // update on x and y
    if (this.x < 0) {
      this.setVelocityX(300);
    }
    if (this.x > 800) {
      this.setVelocityX(-300);
    }
  }
}
