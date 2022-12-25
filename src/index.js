import Phaser from "phaser";
import L_logo from "./assets/L_logo.png";
import B_ship from "./assets/B_ship.png";
import P_player from "./assets/P_player.png";

class MyGame extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image("logo", L_logo);
  }

  create() {
    const logo = this.add.image(400, 150, "logo");

    this.tweens.add({
      targets: logo,
      y: 450,
      duration: 2000,
      ease: "Power2",
      yoyo: true,
      loop: -1,
    });
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: MyGame,
};

const game = new Phaser.Game(config);

console.log("d");
