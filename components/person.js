export const createPerson = app => {

  const setup = () => {

    // Create person frames

    let frames = [];
    for (let i = 0; i < 4; i += 1) {
      let texture = new PIXI.Texture(PIXI.Texture.from("../pictures/foo.png"));
      texture.frame = new PIXI.Rectangle((i * 64), 0, 64, 64);
      frames.push(texture);
    }
    let foo = new PIXI.extras.AnimatedSprite(frames);

    // Set person to center

    foo.x = (app.screen.width / 2) - (foo.width / 2);
    foo.y = (app.screen.height / 2) - (foo.height / 2);
    foo.anchor.set(0.5);
    app.stage.addChild(foo);

    const getMousePosition = () => {
      return app.renderer.plugins.interaction.mouse.global;
    }

    // Animation settigs

    let xVelocity = 0.1;
    let yVelocity = 0.1;
    let mousePosition = getMousePosition();
    let speed = 5;
    let angle = 45;

    app.ticker.add(() => {

      // Follow the mouse

      mousePosition = getMousePosition();
      let dx = mousePosition.x - foo.x;
      let dy = mousePosition.y - foo.y;
      angle = Math.atan2(dx, dy)
      xVelocity = Math.sin(angle) * speed;
      yVelocity = Math.cos(angle) * speed;
      if (Math.abs(dx - dy) > 5) {
        foo.x += xVelocity
        foo.y += yVelocity
      }

      // Walls

      const contain = (s, c) => { // (sptire, container)
        let collision = undefined;

        if (s.x < c.x + s.width / 2) {
          s.x = c.x + s.width / 2;
          collision = "left";
        }
        if (s.y < c.y + s.height / 2) {
          s.y = c.y + s.height / 2;
          collision = "top";
        }
        if (s.x + s.width / 2 > c.width) {
          s.x = c.width - s.width / 2;
          collision = "right";
        }
        if (s.y + s.height / 2 > c.height) {
          s.y = c.height - s.width / 2;
          collision = "bottom";
        }
        return collision;
      }

      contain(foo, { x: 0, y: 0, width: 600, height: 600 });

      // Specific frame
      if (dx - Math.abs(dy) > 0) {
        foo.gotoAndStop(1);
      } else if ((-1 * dx) - Math.abs(dy) > 0) {
        foo.gotoAndStop(2);
      } else if (dy < 0) {
        foo.gotoAndStop(3);
      } else if (dy > 0){
        foo.gotoAndStop(0);
      }
    });
  }

  window.onload = () => {
    PIXI.loaders.shared.add(["../pictures/foo.png"]).load(setup);
  };
}
