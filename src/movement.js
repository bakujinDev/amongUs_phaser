import { PLAYER_SPEED, SHIP_HEIGHT, SHIP_WIDTH } from "./config/constants";
import { mapBounds } from "../mapBounds";

const isWithinMovementBoundaries = (x, y) => {
  return !mapBounds[y] ? true : !mapBounds[y].includes(x);
};

export const movePlayers = (keys, playerSprite) => {
  const absPlayerX = playerSprite.x + SHIP_WIDTH / 2;
  const absPlayerY = playerSprite.y + SHIP_HEIGHT / 2 + 20;

  if (
    keys.includes("ArrowUp") &&
    isWithinMovementBoundaries(absPlayerX, absPlayerY - PLAYER_SPEED)
  )
    playerSprite.y -= PLAYER_SPEED;

  if (
    keys.includes("ArrowRight") &&
    isWithinMovementBoundaries(absPlayerX + PLAYER_SPEED, absPlayerY)
  ) {
    playerSprite.x += PLAYER_SPEED;
    playerSprite.flipX = false;
  }

  if (
    keys.includes("ArrowDown") &&
    isWithinMovementBoundaries(absPlayerX, absPlayerY + PLAYER_SPEED)
  )
    playerSprite.y += PLAYER_SPEED;

  if (
    keys.includes("ArrowLeft") &&
    isWithinMovementBoundaries(absPlayerX - PLAYER_SPEED, absPlayerY)
  ) {
    playerSprite.x -= PLAYER_SPEED;
    playerSprite.flipX = true;
  }
};
