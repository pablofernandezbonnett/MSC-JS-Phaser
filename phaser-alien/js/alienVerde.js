class AlienVerde extends Phaser.Physics.Arcade.Sprite {
  constructor(escena, x, y) {
    super(escena, x, y, "GreenShip");
    // Guardar referencia a la escena
    this.escena = escena;
    // Añadir a la escena
    this.escena.add.existing(this);
    // Sí es físico también hay que añadirlo a Physics
    this.escena.physics.add.existing(this);
    // Habilitar controles
    this.cursores = this.escena.input.keyboard.createCursorKeys();
  }

  update() {
    // izquierda y derecha
    if (this.cursores.up.isDown) {
      this.setVelocityY(-200);
    }
    if (this.cursores.down.isDown) {
      this.setVelocityY(200);
    }
    // arriba y abajo
    if (this.cursores.up.isDown) {
      this.setVelocityY(-200);
    }
    if (this.cursores.down.isDown) {
      this.setVelocityY(200);
    }
    if (!this.cursores.up.isDown && !this.cursores.down.isDown) {
      this.setVelocityY(0);
    }
  }
}
