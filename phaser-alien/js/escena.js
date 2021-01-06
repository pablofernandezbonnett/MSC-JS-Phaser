class Escena extends Phaser.Scene {
  preload() {
    this.load.path = "res/";
    this.load.image("fondo", "fondo.jpg");
    this.load.image("GreenShip", "shipGreen.png");
    this.load.image("BeigeShip", "shipBeige.png");
    this.load.image("PinkShip", "shipPink.png");
  }

  create() {
    this.fondo = this.add.image(0, 0, "fondo").setOrigin(0, 0);
    this.alienVerde = new AlienVerde(this, 300, 300);
    this.alienMarron = new AlienMarron(this, 600, 300);
    this.physics.add.collider(
      "GreenShip",
      "BeigeShip",
      this.colision,
      null,
      this
    );
    this.alienRosa = new AlienRosa(this, 600, 300);
  }

  update() {
    this.alienVerde.update();
    this.alienMarron.update();
    this.alienRosa.update();
  }

  colision() {
    this.scene.restart();
  }
}
