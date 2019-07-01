function setup() {

  // Setup PixiJS application
  let app = new PIXI.Application(600, 600, {
    backgroundColor: 0xefefef,
  });
  document.body.appendChild(app.view);

  // Create and centre sprite
  let frames = [];
  for (let i = 0; i < 4; i += 1) {
    let texture = new PIXI.Texture(PIXI.Texture.from("foo.png"));
    texture.frame = new PIXI.Rectangle((i * 64), 0, 64, 64);
    frames.push(texture);
  }
  let foo = new PIXI.extras.AnimatedSprite(frames);
  foo.x = (app.screen.width / 2) - (foo.width / 2);
  foo.y = (app.screen.height / 2) - (foo.height / 2);
  app.stage.addChild(foo);

  app.ticker.add((delta) => {
    // Set velocity based on keyboard input
    let xv = 0;
    let yv = 0;
    let speed = 3;
    if (keys[37]) { xv -= speed; }
    if (keys[38]) { yv -= speed; }
    if (keys[39]) { xv += speed; }
    if (keys[40]) { yv += speed; }

    // Update position
    foo.x += xv;
    foo.y += yv;
    if (foo.x < -foo.width) {
      foo.x += app.screen.width + foo.width;
    } else if (foo.x > app.screen.width) {
      foo.x = -foo.width;
    }
    if (foo.y < -foo.height) {
      foo.y += app.screen.height + foo.height;
    } else if (foo.y > app.screen.height) {
      foo.y = -foo.height;
    }

    // Set frame to match direction
    if (xv > 0) {
      foo.gotoAndStop(1);
    } else if (xv < 0) {
      foo.gotoAndStop(2);
    } else if (yv < 0) {
      foo.gotoAndStop(3);
    } else {
      foo.gotoAndStop(0);
    }
  });
}

var keys = {};

window.onkeyup = function (key_event) {
  keys[key_event.keyCode] = false;
};
window.onkeydown = function (key_event) {
  keys[key_event.keyCode] = true;
};
window.onload = function () {
  PIXI.loaders.shared.add(["foo.png"]).load(setup);
};