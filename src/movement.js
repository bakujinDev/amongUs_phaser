import { PLAYER_SPEED } from "./config/constants";

export const movePlayers = (keys, playerSprite) => {
  if (keys.includes("ArrowUp")) playerSprite.y -= PLAYER_SPEED;
  if (keys.includes("ArrowRight")) {
    playerSprite.x += PLAYER_SPEED;
    playerSprite.flipX = false;
  }
  if (keys.includes("ArrowDown")) playerSprite.y += PLAYER_SPEED;
  if (keys.includes("ArrowLeft")) {
    playerSprite.x -= PLAYER_SPEED;
    playerSprite.flipX = true;
  }
};
