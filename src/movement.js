import { PLAYER_SPEED, SHIP_HEIGHT, SHIP_WIDTH } from "./config/constants";
import { mapBounds } from "./config/mapBounds";

const isWithinMovementBoundaries = (x, y) => {
  return mapBounds[y].includes(x);
};

export const movePlayers = (keys, playerSprite) => {
  let playerMoved = false;
  const absPlayerX = playerSprite.x + SHIP_WIDTH / 2;
  const absPlayerY = playerSprite.y + SHIP_HEIGHT / 2 + 20;

  if (
    keys.includes("ArrowUp") &&
    isWithinMovementBoundaries(absPlayerX, absPlayerY - PLAYER_SPEED)
  ) {
    playerMoved = true;
    playerSprite.y -= PLAYER_SPEED;
  }

  if (
    keys.includes("ArrowRight") &&
    isWithinMovementBoundaries(absPlayerX + PLAYER_SPEED + 14, absPlayerY)
  ) {
    playerMoved = true;
    playerSprite.x += PLAYER_SPEED;
    playerSprite.flipX = false;
  }

  if (
    keys.includes("ArrowDown") &&
    isWithinMovementBoundaries(absPlayerX, absPlayerY + PLAYER_SPEED)
  ) {
    playerMoved = true;
    playerSprite.y += PLAYER_SPEED;
  }

  if (
    keys.includes("ArrowLeft") &&
    isWithinMovementBoundaries(absPlayerX - PLAYER_SPEED - 14, absPlayerY)
  ) {
    playerMoved = true;
    playerSprite.x -= PLAYER_SPEED;
    playerSprite.flipX = true;
  }

  return playerMoved;
};
