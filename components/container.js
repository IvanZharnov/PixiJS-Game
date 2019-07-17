export const createFrame = () => {
  const app = new PIXI.Application(700, 700, { backgroundColor: 0xf7faff });
  document.body.appendChild(app.view);
  return app;
}
