export const createPerson = (app, s) => {

  const setup = () => {

    // Create person

    let foo = new PIXI.extras.AnimatedSprite([
      PIXI.Sprite.from("../pictures/rick.svg")
    ]);

    // Set person to center

    foo.anchor.set(0.5);
    foo.width = 80;
    foo.height = 80;
    foo.x = app.screen.width / 2;
    foo.y = app.screen.height / 2;
    app.stage.addChild(foo);

    const getMousePosition = () => {
      return app.renderer.plugins.interaction.mouse.global;
    }

    const mr = num => {
      return Math.round(num)
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
      let dy = mousePosition.y - foo.y - 20;
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

      let spX = mr(s.x) + 30;
      let smX = mr(s.x) - 30;
      let spY = mr(s.y) + 30;
      let smY = mr(s.y) - 30;

      let ppX = mr(foo.x) + 35;
      let pmX = mr(foo.x) - 35;
      let ppY = mr(foo.y) + 35;
      let pmY = mr(foo.y) - 35;

      if (((pmX < spX && spX < ppX) || (pmX < smX && smX < ppX)) &&
          ((pmY < smY && smY < ppY) || (pmY < spY && spY < ppY))) {
        console.log('lose')
      }

      contain(foo, { x: 0, y: 0, width: 700, height: 700 });
    });
  }

  window.onload = () => {
    PIXI.loaders.shared.add(["../pictures/rick.svg"]).load(setup);
  };
}
