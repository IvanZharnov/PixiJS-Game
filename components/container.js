export default createFrame = () => {
  const app = new PIXI.Application(600, 600, {
    backgroundColor: 0xefefef,
  });
  document.body.appendChild(app.view);
  return app;
}
