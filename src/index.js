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
import { io } from "socket.io-client";
import {
  getQueryParameter,
  getRandomString,
  updateQueryParameter,
} from "./uitl/utils";

const player = {};
const otherPlayer = {};
let socket;
let pressedKeys = [];

const room = getQueryParameter("room") || getRandomString(5);
window.history.replaceState(
  {},
  document.title,
  updateQueryParameter("room", room)
);

class MyGame extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    socket = io(`localhost:3000?room=${room}`);

    this.load.image("ship", B_ship);
    this.load.spritesheet("player", S_player, {
      frameWidth: PLAYER_SPRITE_WIDTH,
      frameHeight: PLAYER_SPRITE_HEIGHT,
    });
    this.load.spritesheet("otherPlayer", S_player, {
      frameWidth: PLAYER_SPRITE_WIDTH,
      frameHeight: PLAYER_SPRITE_HEIGHT,
    });
  }

  create() {
    const ship = this.add.image(0, 0, "ship");

    player.sprite = this.add.sprite(PLAYER_START_X, PLAYER_START_Y, "player");
    player.sprite.displayWidth = PLAYER_WIDTH;
    player.sprite.displayHeight = PLAYER_HEIGHT;

    otherPlayer.sprite = this.add.sprite(
      PLAYER_START_X,
      PLAYER_START_Y,
      "otherPlayer"
    );
    otherPlayer.sprite.displayWidth = PLAYER_WIDTH;
    otherPlayer.sprite.displayHeight = PLAYER_HEIGHT;

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

    socket.on("move", ({ x, y }) => {
      if (otherPlayer.sprite.x > x) otherPlayer.sprite.flipX = true;
      else if (otherPlayer.sprite.x < x) otherPlayer.sprite.flipX = false;

      otherPlayer.sprite.x = x;
      otherPlayer.sprite.y = y;
      otherPlayer.moving = true;
    });
    socket.on("moveEnd", () => {
      otherPlayer.moving = false;
    });
    socket.on("playerJoined", () => {
      console.log("playerJoined!");
    });
  }

  update() {
    this.scene.scene.cameras.main.centerOn(player.sprite.x, player.sprite.y);

    const playerMoved = movePlayers(pressedKeys, player.sprite);

    if (playerMoved) {
      socket.emit("move", { x: player.sprite.x, y: player.sprite.y });
      player.moveLastFrame = true;
    } else {
      if (player.moveLastFrame) socket.emit("moveEnd");

      player.moveLastFrame = false;
    }

    animateMovement(pressedKeys, player.sprite);

    if (otherPlayer.moving) {
      if (!otherPlayer.sprite.anims.isPlaying)
        otherPlayer.sprite.play("running");
    } else {
      if (otherPlayer.sprite.anims.isPlaying)
        otherPlayer.sprite.stop("running");
    }
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
