export const animateMovement = (keys, playerSprite) => {
  const runningKeys = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];

  if (keys.some((key) => runningKeys.includes(key))) {
    if (!playerSprite.anims.isPlaying) playerSprite.play("running");
  } else {
    if (playerSprite.anims.isPlaying) playerSprite.stop("running");
  }
};
