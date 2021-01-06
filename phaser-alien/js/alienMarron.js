class AlienMarron extends Phaser.Physics.Arcade.Sprite {
  constructor(escena, x, y) {
    super(escena, x, y, "BeigeShip");
    // Guardar referencia a la escena
    this.escena = escena;
    // Añadir a la escena
    this.escena.add.existing(this);
    // Sí es fisico también hay que añadirlo a Physics
    this.escena.physics.add.existing(this);
    // speed var
    this.velocidad = 200;
    this.setVelocityX(this.velocidad);
    this.setVelocityY(this.velocidad);
  }

  update() {
    // update velocidad on every call
    this.velocidad = this.velocidad + 0.05;
    // update on x and y
    if (this.x < 0) {
      this.setVelocityX(this.velocidad);
    }
    if (this.x > 800) {
      this.setVelocityX(-this.velocidad);
    }
    if (this.y < 0) {
      this.setVelocityY(this.velocidad);
    }
    if (this.y > 600) {
      this.setVelocityY(-this.velocidad);
    }
  }
}
