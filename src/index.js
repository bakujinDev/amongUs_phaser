import Phaser from "phaser";
import B_ship from "./assets/B_ship.png";
import S_player from "./assets/S_player.png";
import {
  PLAYER_SPRITE_WIDTH,
  PLAYER_SPRITE_HEIGHT,
  PLAYER_START_X,
  PLAYER_START_Y,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
} from "./config/constants";
import { movePlayers } from "./movement";
import { animateMovement } from "./animation";

const player = {};
let pressedKeys = [];

class MyGame extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image("ship", B_ship);
    this.load.spritesheet("player", S_player, {
      frameWidth: PLAYER_SPRITE_WIDTH,
      frameHeight: PLAYER_SPRITE_HEIGHT,
    });
  }

  create() {
    const ship = this.add.image(0, 0, "ship");
    player.sprite = this.add.sprite(PLAYER_START_X, PLAYER_START_Y, "player");
    player.sprite.displayWidth = PLAYER_WIDTH;
    player.sprite.displayHeight = PLAYER_HEIGHT;

    this.anims.create({
      key: "running",
      frames: this.anims.generateFrameNumbers("player"),
      frameRate: 24,
      repeat: -1,
    });

    this.input.keyboard.on("keydown", (e) => {
      if (!pressedKeys.includes(e.code)) pressedKeys.push(e.code);
    });
    this.input.keyboard.on(
      "keyup",
      (e) => (pressedKeys = pressedKeys.filter((key) => key !== e.code))
    );
  }

  update() {
    this.scene.scene.cameras.main.centerOn(player.sprite.x, player.sprite.y);

    movePlayers(pressedKeys, player.sprite);
    animateMovement(pressedKeys, player.sprite);
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
