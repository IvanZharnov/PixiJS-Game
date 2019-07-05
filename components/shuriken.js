const onMove = (shuriken, position, x = 0.3, y = 0.3) => {
  if (position === 0 || position === 1 ) {
    shuriken.x = shuriken.x + x;
  } else {
    shuriken.x = shuriken.x - x;
  }

  if (position === 0 || position === 3 ) {
    shuriken.y = shuriken.y + y;
  } else {
    shuriken.y = shuriken.y - y;
  }
}

const startPointsX = [20, 20, 580, 580];
const startPointsY = [20, 580, 580, 20];

export const createShuriken = app => {

  for (let i = 0; i < 4; i += 1) {
    const shuriken = PIXI.Sprite.from("../pictures/shuriken.png");
    shuriken.anchor.set(0.5);
    shuriken.width = 50;
    shuriken.height = 50;
    shuriken.x = startPointsX[i];
    shuriken.y = startPointsY[i];
    app.stage.addChild(shuriken);
    const randX = Math.random();
    const randY = Math.random();
    setInterval(() => onMove(shuriken, i, randX, randY), 5);
    app.ticker.add((delta) => {
      shuriken.rotation += 0.03 * delta;
    });
  }

}
